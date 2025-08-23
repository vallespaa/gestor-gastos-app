export const getAdjustmentsByAccount = async (repository, accountId) => {
  return await repository.getAdjustmentsByAccount(accountId);
};