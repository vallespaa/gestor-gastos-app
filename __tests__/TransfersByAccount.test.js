import AsyncStorage from '@react-native-async-storage/async-storage';
import TransferAsyncStorageRepository from '../app/data/transfers/TransferAsyncStorageRepository';
import {
  createTransfer,
  getTransfersByAccount,
} from '../app/application/TransferUseCases';
import { FinancialProvider } from '../shared/context/FinancialContext';

// Render-free access to the context value: stub the hooks so the provider can
// be called as a plain function and its `value` prop read directly.
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initial) => [initial, () => {}],
  useEffect: () => {},
}));

const transfers = [
  { id: 't1', fromAccountId: 'a1', toAccountId: 'a2', amount: 10 },
  { id: 't2', fromAccountId: 'a2', toAccountId: 'a3', amount: 20 },
  { id: 't3', fromAccountId: 'a3', toAccountId: 'a1', amount: 30 },
];

const seed = async (repo) => {
  for (const t of transfers) {
    await createTransfer(repo, { ...t, date: '2025-01-01' });
  }
};

const ids = (list) => list.map((t) => t.id).sort();

describe('getTransfersByAccount', () => {
  beforeEach(() => AsyncStorage.clear());

  it('use case returns transfers from or to the account', async () => {
    const repo = new TransferAsyncStorageRepository();
    await seed(repo);
    expect(ids(await getTransfersByAccount(repo, 'a1'))).toEqual(['t1', 't3']);
  });

  it('context function passes its repository to the use case', async () => {
    await seed(new TransferAsyncStorageRepository());
    const { value } = FinancialProvider({ children: null }).props;
    expect(ids(await value.getTransfersByAccount('a1'))).toEqual(['t1', 't3']);
  });

  it('context function returns null without an account id', async () => {
    const { value } = FinancialProvider({ children: null }).props;
    expect(await value.getTransfersByAccount(undefined)).toBeNull();
  });
});
