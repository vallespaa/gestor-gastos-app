export const deleteAdjustment = async (repository, id) => {
  await repository.delete(id);
};
