import Account from '../domain/entities/Account.js';

export const createAccount = async (repository, data) => {
  const account = Account.fromPlainObject(data);
  return await repository.create(account);
};
