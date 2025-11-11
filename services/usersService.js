const User = require('../models/User');

class usersService {
  constructor() {}

  async create(data) {
    const user = new User(data);
    await user.save();
    return user.toObject();
  }

  async getAll() {
    return User.find().lean();
  }

  async getById(id) {
    return User.findById(id).lean();
  }

  async update(id, changes) {
    const updated = await User.findByIdAndUpdate(id, changes, { new: true }).lean();
    if (!updated) throw new Error('User Not Found');
    return updated;
  }

  async delete(id) {
    const deleted = await User.findByIdAndDelete(id).lean();
    if (!deleted) throw new Error('User Not Found');
    return { id };
  }
}

module.exports = usersService;



