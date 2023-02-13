const mongoose= require('mongoose')
const UserModel= mongoose.model(
    "netflim-node",
    {
        name:{
            type: String,
            require: true
        },
        age:{
            type: Number,
            require: true
        },
    },
    "user"
)

module.exports = {UserModel};