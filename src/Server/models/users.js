const mongoose = require('mongoose')
const frame = require("./frame")

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
        type: [frame.schema],
        required: true
    }
})

const userModel = mongoose.model("users", usersScehma);

module.exports = {
    model:userModel,
    schema:usersScehma
};