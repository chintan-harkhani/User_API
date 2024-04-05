const mongoose = require("mongoose");
const Url="http://localhost:3000/"

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
       image:{
         type:String,
       },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: function (doc, data) {
              if (data?.image) {
                data.image = `${Url}images/${data.image}`;
              }
            },
          },
    }
)

const user = mongoose.model("user", UserSchema);
module.exports = user;
