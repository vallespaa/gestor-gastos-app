import Transaction from '../domain/entities/Transaction.js';

export const updateTransaction = async (repository, data) => {
  const updatedTransaction = new Transaction(data);

  if (!updatedTransaction.isValid()) {
    throw new Error('Transacción inválida');
  }

  await repository.update(updatedTransaction);
};
