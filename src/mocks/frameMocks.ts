import { FrameData, Action, FrameActionData } from "../components/frameData";

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

  // console.log(imageData);
  // Create a new ImageData object using the pixel data
  const mockedImageData = new ImageData(imageData, width, height);
  return mockedImageData;
}

function createBlankImageData(): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = 80;
  canvas.height = 60;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not get canvas context');
  return context.createImageData(canvas.width, canvas.height);
}

let mockedFrames: FrameData[] = [];

const frame1Actions: Action[] = [
  {
    opacity: 1.0,
    color: "#000000",
    radius: 5,
    pos: [
      
    ],
  },
];
const frame1: FrameData = {
  actions: frame1Actions,
  image: createMockImg(),
  frameNum: 1,
};

const frame2Actions: Action[] = [
  {
    opacity: 1.0,
    color: "#000000",
    radius: 5,
    pos: [
    
    ],
  },
];
const frame2: FrameData = {
  actions: frame2Actions,
  image: createMockImg(),
  frameNum: 2,
};

mockedFrames.push(frame1);
mockedFrames.push(frame2);

export function createMockFrame1(): FrameData {
  let mockedFrames: FrameData[] = [];

  const frame1Actions: Action[] = [
    {
      opacity: 1.0,
      color: "#000000",
      radius: 5,
      pos: [
        
      ],
    },
  ];
  const frame1: FrameData = {
    actions: frame1Actions,
    image: createBlankImageData(),
    frameNum: 1,
  };
  return frame1;
}

export function createMockFrame2(): FrameData {
  const frame2Actions: Action[] = [
    {
      opacity: 1.0,
      color: "#000000",
      radius: 5,
      pos: [
      ]
    },
  ];
  const frame2: FrameData = {
    actions: frame2Actions,
    image: createBlankImageData(),
    frameNum: 2,
  };

  return frame2;
}

export function createMockFramesJSON() {
  return JSON.stringify(createMockFrame1());
}

export default mockedFrames;
