const { userService } = require("../service");
const path = require("path");

//crete user
const CreateUser = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody);
    if (req.file) {
      reqBody.image = req.file.filename;
    } else {
      throw new Error("Image Is Required....!");
    }
    const name = await userService.FindName(reqBody.name);
    if (name) {
      throw new Error(
        "Name Already Created By this Name (" +
          name.name +
          ") Please Create By this name..!"
      );
    }
    let user = await userService.CreateUser(reqBody);
    if (!user) {
      throw new Error(" User Not Created , Please Try  Again Later");
    }

    res.status(200).json({
      success: true,
      message: " SuccessFully  User Created ..!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//User List
const UserList = async (req, res) => {
  try {
    const List = await userService.UserList(req, res);
    res.status(200).json({
      success: true,
      message: " User Data SuccessFully List Get !.....",
      data: List,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const UserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const ID = await userService.UserId(userId);
    if (!ID) {
      throw new Error("User Not Found !...");
    }
    res.status(200).json({
      success: true,
      message: "Suucessfully User List Get!....",
      data: ID,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
//delete user
const DeleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const ID = await userService.UserId(userId);
    if (!ID) {
      throw new Error("User Not Found !...");
    }
    await userService.DeleteUser(userId);
    res.status(200).json({
      success: true,
      message: "Suucessfully User Data Deleted!....",
      data: ID,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//update user
const UpdateUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const ID = await userService.UserId(userId);
    if (!ID) {
      throw new Error("User Not Found !...");
    }

    const { name, email, phone  } = req.body;
    if (req.file) {
        image = req.file.filename;
      }
   

    await userService.UpdateUser(userId, { name, email, phone, image });
    res.status(200).json({
      success: true,
      message: "User Data update successfully!",
    });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Searching User

const SearchUser = async (req, res) => {
  try {
    const { name, email, phone } = req.query;

    if (!name && !email && !phone) {
      return res.status(400).json({
        message: "At least one search parameter is required",
      });
    }
    let query = {};
    if (name) {
      query.name = name;
    }
    if (email) {
      query.email = email;
    }
    if (phone) {
      query.phone = phone;
    }

    const result = await userService.SearchUser(query);

    if (result.length === 0) {
      return res.status(404).json({ message: "No matching records found" });
    }
    res.status(200).json({
      success: true,
      message: "User Data Serching successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//User Pagination

const UserPage = async (req, res) => {
  try {
    const page = req.query.page;
    const size = 2;
    const pages = parseInt(page);

    const Index = (pages - 1) * size;

    if (page < 1) {
      return res
        .status(400)
        .json({ message: "Page number must be greater than or equal to 1" });
    }

    const item = await userService.UserPage(Index, size);

    res.status(200).json({
      success: true,
      message: "User Data Pagination successfully!",
      data: item,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//multiple user Delete

const MultipleDelete = async (req, res) => {
  try {
    // const IndexId = req.body.ids;

    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid or empty 'ids' array" });
    }
    // const result = await userService.MultipleDelete(IndexId);
    const result = await userService.MultipleDelete(ids);

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No records found with the provided ids" });
    }
    res.status(200).json({
      success: true,
      message: "User Multiple Delete successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports = {
  CreateUser,
  UserList,
  UserId,
  DeleteUser,
  UpdateUser,
  SearchUser,
  UserPage,
  MultipleDelete,
};
