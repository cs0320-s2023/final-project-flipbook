const mongoose = require("mongoose");
const user = require("./models/users.js")
const frame = require("./models/frame.js")
const action = require("./models/action.js")
const express = require('express')
const fs = require('fs');



async function main() {

  var cors = require('cors')

  const app = express();
  app.use(cors()) // Use this after the variable declaration

  await mongoose.connect(
    "mongodb+srv://admin:admin@flipbookbe.zh51nq0.mongodb.net/test"
  );
  app.use(express.json());


  app.post('/data', async (req, res) => {
    try {
      console.log(req.body)
      // console.log(res)
      // console.log(req)
      // console.log(res)
      // const { name, age } = req.body;
      // const newData = new MyDataModel({ name, age });
      // await newData.save();
      // res.status(201).json({ message: 'Data saved successfully' });

      // async function saveFrames() {  
      //   const frames = [];
      //   props.frames.forEach(function (frame) {
      //     const modelledFrame = new frameM.model(frame);
      //     frames.push(modelledFrame);
      //   });
      //   const toSave = new user.model({
      //     title: "to save",
      //     pid: "1234567",
      //     frameData: frames,
      //   });
      //   toSave.save()
    } catch (error) {
      console.error('Error saving data:', error);
      // res.status(500).json({ error: 'An error occurred while saving data' });
    }
  });
  
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
  // let rawdata1 = fs.readFileSync('./mocks/mockFrame1.json');
  // const frame1Data = JSON.parse(rawdata1);

  // let rawdata2 = fs.readFileSync('./mocks/mockFrame1.json');
  // const frame2Data = JSON.parse(rawdata2);

  // let rawdataUser = fs.readFileSync('./mocks/mockUser.json');
  // const userParsed = JSON.parse(rawdataUser);

  // const mockFrame1Schema = new frame.model({actions:frame1Data.actions,image:frame1Data.image,frameNum:frame1Data.frameNum});
  // const mockFrame2Schema = new frame.model({actions:frame2Data.actions,image:frame2Data.image,frameNum:frame2Data.frameNum});
  // const mockFrames = [mockFrame1Schema,mockFrame2Schema]
  // const mockUser = new user.model(userParsed);
  // await mockUser.save(); 
}

main()