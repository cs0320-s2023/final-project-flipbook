const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    color:{
        type: String,
        required: true,
    },
  radius: {
      type: Number,
      required: true,
  },
  pos:{
      type: [[Number]],
      required:true,
    }
})
  

const actionModel = mongoose.model("action", actionSchema);

module.exports = {
    model:actionModel,
    schema:actionSchema}
