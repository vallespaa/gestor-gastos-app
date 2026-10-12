import AsyncStorage from '@react-native-async-storage/async-storage';
import Transfer from '../app/domain/entities/Transfer';
import TransferAsyncStorageRepository from '../app/data/transfers/TransferAsyncStorageRepository';
import {
  createTransfer,
  updateTransfer,
} from '../app/application/TransferUseCases';

const base = {
  id: '1',
  fromAccountId: 'a1',
  toAccountId: 'a2',
  amount: 12.5,
  date: '2025-01-01',
};

describe('Transfer', () => {
  it('is valid with all required fields', () => {
    expect(new Transfer(base).isValid()).toBeTruthy();
  });

  it('is invalid with a string or non-positive amount', () => {
    expect(new Transfer({ ...base, amount: '12,5' }).isValid()).toBeFalsy();
    expect(new Transfer({ ...base, amount: NaN }).isValid()).toBeFalsy();
    expect(new Transfer({ ...base, amount: 0 }).isValid()).toBeFalsy();
  });

  it('is invalid when both accounts are the same', () => {
    expect(new Transfer({ ...base, toAccountId: 'a1' }).isValid()).toBeFalsy();
  });
});

describe('Transfer use cases', () => {
  const repo = new TransferAsyncStorageRepository();

  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('stores a decimal amount as a number', async () => {
    await createTransfer(repo, base);
    const [stored] = await repo.getAll();
    expect(stored.amount).toBe(12.5);
  });

  it('rejects an invalid transfer without writing', async () => {
    await expect(
      createTransfer(repo, { ...base, amount: '12' }),
    ).rejects.toThrow();
    await expect(
      updateTransfer(repo, { ...base, amount: -1 }),
    ).rejects.toThrow();
    expect(await repo.getAll()).toEqual([]);
  });
});
