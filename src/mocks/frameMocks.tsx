import { FrameData, Action } from "../components/frameData";

const width = 100; // width of the image
const height = 50; // height of the image
const channels = 4; // number of channels (R, G, B, Alpha)

// Create an array to hold the pixel data

function createMockImg(): ImageData {
  const imageData = new Uint8ClampedArray(width * height * channels);

  // Loop through each pixel and set its value
  for (let i = 0; i < width * height; i++) {
    const index = i * channels;
    imageData[index] = Math.random() * 255; // R channel
    imageData[index + 1] = Math.random() * 255; // G channel
    imageData[index + 2] = Math.random() * 255; // B channel
    imageData[index + 3] = 255; // Alpha channel (fully opaque)
    // console.log('working ',i);
  }

  console.log(imageData);
  // Create a new ImageData object using the pixel data
  const mockedImageData = new ImageData(imageData, width, height);
  return mockedImageData;
}

let mockedFrames: FrameData[] = [];

const frame1Actions: Action[] = [{
  color: "#000000",
  radius: 5,
  pos: [
    
  ]
}, {
  color: "#000000",
  radius: 5,
  pos: [
    
  ]
}];
const frame1: FrameData = {
  actions: frame1Actions,
  image: createMockImg(),
  frameNum: 1,
};

const frame2Actions: Action[] = [{
  color: "#000000",
  radius: 5,
  pos: [
    
  ]
},{
  color: "#000000",
  radius: 5,
  pos: [
    
  ]
}];
const frame2: FrameData = {
  actions: frame2Actions,
  image: createMockImg(),
  frameNum: 2,
};

mockedFrames.push(frame1);
mockedFrames.push(frame2);

export default mockedFrames;
