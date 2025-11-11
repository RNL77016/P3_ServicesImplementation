const Category = require('../models/Category');

class categoriesService {
  constructor() {}

  async create(data) {
    const category = new Category(data);
    await category.save();
    return category.toObject();
  }

  async getAll() {
    return Category.find().lean();
  }

  async getById(id) {
    return Category.findById(id).lean();
  }

  async update(id, changes) {
    const updated = await Category.findByIdAndUpdate(id, changes, { new: true }).lean();
    if (!updated) throw new Error('Category Not Found');
    return updated;
  }

  async delete(id) {
    const deleted = await Category.findByIdAndDelete(id).lean();
    if (!deleted) throw new Error('Category Not Found');
    return { id };
  }
}

module.exports = categoriesService;







