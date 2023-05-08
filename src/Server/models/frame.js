const mongoose = require("mongoose");
const action = require("./action");

const frameDataSchema = new mongoose.Schema({
  actions: {
    type: [action.schema],
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
  frameNum: {
    type: Number,
    required: true,
  },
});

const frameModel = mongoose.model("frame", frameDataSchema);

module.exports = {
  model: frameModel,
  schema: frameDataSchema,
};
