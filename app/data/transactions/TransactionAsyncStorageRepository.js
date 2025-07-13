import TransactionRepository from '../../domain/repositories/TransactionRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'transactions';

export default class TransactionAsyncStorageRepository extends TransactionRepository {
  async getAll() {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  };

	async create(transaction) {
    const currentTransactions = await this.getAll();
    const updatedTransactions = [...currentTransactions, transaction];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
	};

	async delete(id) {  
    const currentTransactions = await this.getAll();
    const updatedTransactions = currentTransactions.filter(t => t.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
	};

	async update(updatedTransaction) {
    const currentTransactions = await this.getAll();
    const updatedTransactions = currentTransactions.map(t =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
	};
}
