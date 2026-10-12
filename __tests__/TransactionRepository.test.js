import AsyncStorage from '@react-native-async-storage/async-storage';
import TransactionAsyncStorageRepository from '../app/data/transactions/TransactionAsyncStorageRepository';
import { createTransaction } from '../app/application/createTransaction';
import { updateTransaction } from '../app/application/updateTransaction';

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

  it('stores the amount as a number', async () => {
    const repo = new TransactionAsyncStorageRepository();
    await createTransaction(repo, { ...data, amount: 12.5 });
    expect((await repo.getAll())[0].amount).toBe(12.5);
  });

  it('rejects a string amount on create and update', async () => {
    const repo = new TransactionAsyncStorageRepository();
    await expect(
      createTransaction(repo, { ...data, amount: '10' }),
    ).rejects.toThrow('Transacción inválida');
    await createTransaction(repo, data);
    await expect(
      updateTransaction(repo, { ...data, amount: '20' }),
    ).rejects.toThrow('Transacción inválida');
    expect((await repo.getAll())[0].amount).toBe(10);
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
