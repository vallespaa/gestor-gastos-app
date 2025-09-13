import AdjustmentRepository from '../../domain/repositories/AdjustmentRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'adjustments';

export default class AdjustmentAsyncStorageRepository extends AdjustmentRepository {
  async getAll() {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  async getByAccount(accountId) {
    const currentAdjustments = await this.getAll();
    const filteredAdjustments = currentAdjustments.filter(a => a.accountId == accountId);
    return filteredAdjustments;
  };

	async create(adjustment) {
    const currentAdjustments = await this.getAll();
    const updatedAdjustments = [...currentAdjustments, adjustment];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAdjustments));
	};

	async delete(id) {  
    const currentAdjustments = await this.getAll();
    const updatedAdjustments = currentAdjustments.filter(a => a.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAdjustments));
	};

	async update(updatedAdjustment) {
    const currentAdjustments = await this.getAll();
    const updatedAdjustments = currentAdjustments.map(a =>
      a.id === updatedAdjustments.id ? updatedAdjustment : a
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAdjustments));
	};
}
