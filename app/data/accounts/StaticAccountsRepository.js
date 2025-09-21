import AccountRepository from '../../domain/repositories/AccountRepository';
import Account from '../../domain/entities/Account';
import { DEFAULT_ACCOUNTS } from './DefaultAccounts';

export default class StaticAccountsRepository extends AccountRepository {
  constructor() {
    super();
    this.accounts = DEFAULT_ACCOUNTS.map((acc) => Account.fromPlainObject(acc));
  }

  async getAll() {
    return this.accounts.length ? this.accounts : [];
  }
}
