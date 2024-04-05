const { UserController } = require("../../controller");
const express = require("express");
const validate = require("../../middlewares/validate");
const {upload} = require("../../middlewares/multer");
const {Uservalidation} =require("../../validation");
const router = express.Router();

//user create
router.post("/create",
upload.single("image"),
validate(Uservalidation.CreateUser),
UserController.CreateUser
)

//user list
router.get("/list" ,
UserController.UserList
)
//user id
router.get("/find/:userId",
    UserController.UserId
);
//delete user
router.delete("/delete/:userId",
    UserController.DeleteUser
);

//update user
router.put("/update/:userId",
upload.single("image"),
    UserController.UpdateUser
);
//searching user 
router.get("/search" , 
UserController.SearchUser
)

//User Pagination
router.get("/item" ,
UserController.UserPage
)

// User MultipleDelete 

// router.post("/multipledelete" , 
// UserController.MultipleDelete
// )

router.delete("/muldelete" , 
 UserController.MultipleDelete
)
module.exports = router;