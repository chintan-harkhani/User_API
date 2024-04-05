const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () =>{
    mongoose.connect(process.env.MONGODB_URL).then((data)=>{
        console.log("DataBase SuccessFully Connected.....! ");

    }).catch((Error)=>{
         console.log("DataBase Connection Error !!....",Error);
    });
};
module.exports = {connectDB}    