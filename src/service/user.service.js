const { UserModel } = require("../model");

//create user
const CreateUser = async (Reqbody) => {
  return UserModel.create(Reqbody);
};
// user list
const UserList = async (req, res) => {
  return UserModel.find();
};

//find  name
const FindName = async (name) => {
  return UserModel.findOne({ name });
};
//find Id
const UserId = async (userId) => {
  return UserModel.findById(userId);
};
//delete user
const DeleteUser = async (userId) => {
  return UserModel.findByIdAndDelete(userId);
};

//upadte user
const UpdateUser = async (userId, updateBody) => {
  return UserModel.findByIdAndUpdate(userId, { $set: updateBody });
};
// sesaching user

const SearchUser = async (query) => {
  return UserModel.find(query);
};

// User Pagination
const UserPage = async (Index, size) => {
  return UserModel.find().skip(Index).limit(size);
};

// user Multiple delete
// const MultipleDelete = async (IndexId) => {
//   return UserModel.deleteMany({ _id: { $in: IndexId } });
// };
const MultipleDelete = async (ids) => {
  return UserModel.deleteMany({ _id: { $in: ids } });
};
//module export
module.exports = {
  CreateUser,
  UserList,
  FindName,
  UserId,
  DeleteUser,
  UpdateUser,
  SearchUser,
  UserPage,
  MultipleDelete
};
