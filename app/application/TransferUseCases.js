import Transfer from '../domain/entities/Transfer.js';

export const getAllTransfers = async (repository) => {
  return await repository.getAll();  
}

export const getTransfersByAccount = async (repository, accountId) => {
  return await repository.getByAccount(accountId);
}

export const createTransfer = async (repository, data) => {
  const transfer = Transfer.fromPlainObject(data);
  return await repository.create(transfer);
}

export const updateTransfer = async (repository, data) => {
  const updatedTransfer = Transfer.fromPlainObject(data);
  await repository.update(updatedTransfer);
}

export const deleteTransfer = async (repository, id) => {
  await repository.delete(id);
}
