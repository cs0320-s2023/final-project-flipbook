const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    
})

const actionModel = mongoose.model("action", actionSchema);

module.exports = {
    model:actionModel,
    schema:actionSchema}
