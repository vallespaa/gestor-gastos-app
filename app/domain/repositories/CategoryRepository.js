export default class TransactionRepository {
  async getAll() {
    throw new Error('getAll() not implemented');
  };

  async getById(id) {
    throw new Error('getById() not implemented');
  }

  async getByType(type) {
    throw new Error('Method not implemented');
  }

	async create(category) {
    throw new Error('create() not implemented');
	};

	async delete(id) {
    throw new Error('delete() not implemented');
	};

	async update(id, upadatedCategory) {
    throw new Error('update() not implemented');
	};
}
