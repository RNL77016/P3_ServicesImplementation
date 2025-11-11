const Brand = require('../models/Brand');

class brandsService {
  constructor() {}

  async create(data) {
    const brand = new Brand(data);
    await brand.save();
    return brand.toObject();
  }

  async getAll() {
    return Brand.find().lean();
  }

  async getById(id) {
    return Brand.findById(id).lean();
  }

  async update(id, changes) {
    const updated = await Brand.findByIdAndUpdate(id, changes, { new: true }).lean();
    if (!updated) throw new Error('Brand Not Found');
    return updated;
  }

  async delete(id) {
    const deleted = await Brand.findByIdAndDelete(id).lean();
    if (!deleted) throw new Error('Brand Not Found');
    return { id };
  }
}

module.exports = brandsService;


