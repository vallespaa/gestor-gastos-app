import Transaction from '../domain/entities/Transaction.js';

export const createTransaction = async (repository, data) => {
  const transaction = new Transaction(data);

  if (!transaction.isValid()) {
    throw new Error('Transacción inválida');
  }

  return await repository.create(transaction);
};
