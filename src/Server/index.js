const mongoose = require("mongoose");
const user = require("./models/users.js")
const frameM = require("./models/frame.js")
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
      console.log(":"+req.query.pid+":");
      const um = await saveFrames(req.body.frames,req.query.pid);
      console.log("fm:"+um.frameData);
      await user.model.findOneAndReplace(
        { pid: req.query.pid },
        um
      );
      res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'An error occurred while saving data' });
    }
  });
  
  async function saveFrames(inputFrames,reqpid) {  
    const modelledFrames = [];
    inputFrames.forEach(function (frame) {
      const modelledFrame = new frameM.model(frame);
      modelledFrames.push(modelledFrame);
    });
    // const toSave = new user.model({
    //   title: "Animation",
    //   pid: reqpid,
    //   frameData: modelledFrames,
    // });
    return {
        title: "Animation",
        pid: reqpid,
        frameData: modelledFrames,
      };
  }

  app.get('/data', async (req, res) => {
    try {
      const userData = await user.model.findOne({ pid: req.query.pid });
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(userData);
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).json({ error: 'An error occurred while retrieving data' });
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