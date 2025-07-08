export const getAllTransactions = async (repository) => {
  return await repository.getAll();
};
