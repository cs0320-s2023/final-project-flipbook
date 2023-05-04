"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var Stars = new Schema({
    // Entity is a unique id we use to track progress by each individual user
    entity: {type: Schema.Types.ObjectId, ref: "Entity"},
    game:  {type: Schema.Types.ObjectId, ref: "Game"},
    // Each mapping can have various levels of difficulty called progression_level
    progression_level: Number,
    stars_earned: Number,
    created_date: {type: Date, default: Date.now},
    location: Schema.Types.Mixed,
}, { collection: "Stars", versionKey: false });

const entityModel = mongoose.model("entity", Stars)

module.exports = Stars;