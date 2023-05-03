

const mongoose = require('mongoose')
const usersScehma = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    pid: {
        type: String,
        required: true
    },
    frameData: {
        type: Array,
        required: true
    }

})

const userModel = mongoose.model("users", usersScehma)

module.exports = userModel;

