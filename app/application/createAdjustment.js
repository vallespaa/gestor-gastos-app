import Adjustment from '../domain/entities/Adjustment.js';

export const createAdjustment = async (repository, data) => {
  const adjustment = Adjustment.fromPlainObject(data);
  return await repository.create(adjustment);
};
