import Account from '../domain/entities/Account.js';

export const updateAccount = async (repository, data) => {
  const updatedAccount = Account.fromPlainObject(data);
  await repository.update(updatedAccount);
};
