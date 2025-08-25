import AccountRepository from '../../domain/repositories/AccountRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Account from '../../domain/entities/Account';
import { DEFAULT_ACCOUNTS } from './DefaultAccounts';

const STORAGE_KEY = 'accounts';

export default class AccountAsyncStorageRepository extends AccountRepository {
  async getAll() {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);

    if (!stored) {
      const defaultAccounts = DEFAULT_ACCOUNTS.map(acc => Account.fromPlainObject(acc));
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAccounts.map(a => a.toPlainObject())));
      return defaultAccounts;
    }

    const accounts = JSON.parse(stored);
    return accounts.map(acc => Account.fromPlainObject(acc));
  };

  async create(account) {
    const currentAccounts = await this.getAll();
    const updatedAccounts = [...currentAccounts, account];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAccounts.map(a => a.toPlainObject())));
  };

  async delete(id) {  
    const currentAccounts = await this.getAll();
    const updatedAccounts = currentAccounts.filter(a => a.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAccounts.map(a => a.toPlainObject())));
  };

  async update(updatedAccount) {
    const currentAccounts = await this.getAll();
    const updatedAccounts = currentAccounts.map(a =>
      a.id === updatedAccount.id ? updatedAccount : a
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAccounts.map(a => a.toPlainObject())));
  };
}
