import AccountRepository from '../../domain/repositories/AccountRepository';
import Account from '../../domain/entities/Account';
import { STATIC_ACCOUNTS } from './StaticAccounts';

export default class StaticAccountsRepository extends AccountRepository {
  constructor() {
    super();
    this.accounts = STATIC_ACCOUNTS.map(acc => Account.fromPlainObject(acc));
  }

  async getAll() {
    return this.accounts.length ? this.accounts : [];
  }
}
