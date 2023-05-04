const mongoose = require("mongoose");
const user = require("./models/users")
const frame = require("./models/frame")
const action = require("./models/action")
const express = require('express')
const fs = require('fs');

async function main() {
  await mongoose.connect(
    "mongodb+srv://admin:admin@flipbookbe.zh51nq0.mongodb.net/test"
  );

  let rawdata1 = fs.readFileSync('./mocks/mockFrame1.json');
  const frame1Data = JSON.parse(rawdata1);

  let rawdata2 = fs.readFileSync('./mocks/mockFrame1.json');
  const frame2Data = JSON.parse(rawdata2);

  let rawdataUser = fs.readFileSync('./mocks/mockUser.json');
  const userParsed = JSON.parse(rawdataUser);

  const mockFrame1Schema = new frame.model({actions:frame1Data.actions,image:frame1Data.image,frameNum:frame1Data.frameNum});
  const mockFrame2Schema = new frame.model({actions:frame2Data.actions,image:frame2Data.image,frameNum:frame2Data.frameNum});
  const mockFrames = [mockFrame1Schema,mockFrame2Schema]
  const mockUser = new user.model(userParsed);
  await mockUser.save(); 
}

main()