import TransferRepository from '../../domain/repositories/TransferRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'transfers';

export default class TransferAsyncStorageRepository extends TransferRepository {
  async getAll() {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  async getByAccount(accountId) {
    const currentTransfers = await this.getAll();
    const filteredTransfers = currentTransfers.filter(a => 
      a.fromAccountId == accountId || a.toAccountId == accountId
    );
    return filteredTransfers;
  };

	async create(transfer) {
    const currentTransfers = await this.getAll();
    const updatedTransfers = [...currentTransfers, transfer];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransfers));
	};

	async delete(id) {  
    const currentTransfers = await this.getAll();
    const updatedTransfers = currentTransfers.filter(a => a.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransfers));
	};

	async update(updatedTransfer) {
    const currentTransfers = await this.getAll();
    const updatedTransfers = currentTransfers.map(a =>
      a.id === updatedTransfer.id ? updatedTransfer : a
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransfers));
	};
}
