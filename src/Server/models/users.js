const mongoose = require('mongoose')
const usersScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    }

})

const userModel = mongoose.model("users", usersScehma)

module.exports = userModel;
