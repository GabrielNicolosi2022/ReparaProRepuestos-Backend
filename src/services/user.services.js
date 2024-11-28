import users from "../models/user.model.js";

const getAll = async () => await users.find().lean();

const getUserById = async (id) => await users.findOne({ _id: id }).exec();

const getUserByEmail = async (email) =>
  await users.findOne({ email: email }).exec();

const createUser = async (data) => await users.create(data).exec();

const updateUserById = async (id, data) =>
  await users.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });

const updatePasswordByEmail = async (email, hashedPassword) =>
  await users.updateOne(
    { email: email },
    { $set: { password: hashedPassword } }
  );

const deleteUserById = async (id) => await users.deleteOne({ _id: id });

export {
  getAll,
  getUserById,
  getUserByEmail,
  createUser,
  updateUserById,
  updatePasswordByEmail,
  deleteUserById,
};
