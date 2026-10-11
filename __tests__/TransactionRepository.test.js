import AsyncStorage from '@react-native-async-storage/async-storage';
import TransactionAsyncStorageRepository from '../app/data/transactions/TransactionAsyncStorageRepository';
import { createTransaction } from '../app/application/createTransaction';

const data = {
  id: '1',
  amount: 10,
  type: 'GASTOS',
  category: 'c1',
  account: 'a1',
  date: '2025-01-01',
};

describe('createTransaction + AsyncStorage repository', () => {
  beforeEach(() => AsyncStorage.clear());

  it('persists a valid transaction', async () => {
    const repo = new TransactionAsyncStorageRepository();
    await createTransaction(repo, data);
    expect(await repo.getAll()).toHaveLength(1);
  });

  it('rejects an invalid transaction without writing', async () => {
    const repo = new TransactionAsyncStorageRepository();
    await expect(
      createTransaction(repo, { ...data, amount: 0 }),
    ).rejects.toThrow('Transacción inválida');
    expect(await repo.getAll()).toHaveLength(0);
  });

  it('updates and deletes by id', async () => {
    const repo = new TransactionAsyncStorageRepository();
    await createTransaction(repo, data);
    await repo.update({ ...data, amount: 20 });
    expect((await repo.getAll())[0].amount).toBe(20);
    await repo.delete('1');
    expect(await repo.getAll()).toHaveLength(0);
  });
});
