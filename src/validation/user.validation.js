const joi  =require("joi");

//create user
const CreateUser = {
    body :joi.object().keys({
        name : joi.string().min(1).max(50).pattern(/^[a-zA-Z\s]*$/).trim().required(),
        email : joi.string().trim().email().required(),
        phone : joi.string().pattern(/^[0-9]{10}$/).required(),
        image : joi.string().allow(""),
        
    })
};

module.exports = {
     CreateUser
}