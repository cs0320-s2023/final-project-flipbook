import { FrameData, Action } from "./frameData";

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

const frame1Actions: Action[] = [{ "color": "#000000", "radius": 5, "pos": [ [ 280, 312, 280, 311 ], [ 280, 311, 280, 308 ], [ 280, 308, 280, 303 ], [ 280, 303, 280, 293 ], [ 280, 293, 280, 282 ], [ 280, 282, 280, 268 ], [ 280, 268, 280, 252 ], [ 280, 252, 280, 235 ], [ 280, 235, 280, 229 ], [ 280, 229, 280, 215 ], [ 280, 215, 280, 201 ], [ 280, 201, 280, 198 ], [ 280, 198, 280, 192 ], [ 280, 192, 280, 186 ], [ 280, 186, 280, 182 ], [ 280, 182, 280, 180 ], [ 280, 180, 280, 179 ], [ 280, 179, 280, 179 ], [ 280, 179, 280, 179 ] ] }];
const frame1: FrameData = {actions:frame1Actions,image:createMockImg(), frameNum:1}

const frame2Actions: Action[] = [{ "color": "#000000", "radius": 5, "pos": [ [ 377, 136, 382, 136 ], [ 382, 136, 401, 136 ], [ 401, 136, 427, 136 ], [ 427, 136, 459, 136 ], [ 459, 136, 501, 136 ], [ 501, 136, 549, 136 ], [ 549, 136, 566, 136 ], [ 566, 136, 604, 136 ], [ 604, 136, 636, 136 ], [ 636, 136, 644, 136 ], [ 644, 136, 664, 136 ], [ 664, 136, 669, 136 ], [ 669, 136, 680, 136 ], [ 680, 136, 686, 136 ], [ 686, 136, 692, 136 ], [ 692, 136, 695, 136 ], [ 695, 136, 697, 136 ], [ 697, 136, 698, 136 ], [ 698, 136, 699, 136 ], [ 699, 136, 699, 136 ] ] }];
const frame2: FrameData = {actions:frame2Actions, image:createMockImg(), frameNum:2}

mockedFrames.push(frame1);
mockedFrames.push(frame2);



export function createMockFrame1():FrameData {
    let mockedFrames: FrameData[] = [];

    const frame1Actions: Action[] = [{ "color": "#000000", "radius": 5, "pos": [ [ 369, 464, 369, 464 ], [ 369, 464, 372, 464 ], [ 372, 464, 376, 462 ], [ 376, 462, 384, 457 ], [ 384, 457, 392, 452 ], [ 392, 452, 405, 444 ], [ 405, 444, 423, 435 ], [ 423, 435, 444, 423 ], [ 444, 423, 464, 412 ], [ 464, 412, 490, 397 ], [ 490, 397, 514, 383 ], [ 514, 383, 540, 370 ], [ 540, 370, 563, 357 ], [ 563, 357, 590, 344 ], [ 590, 344, 613, 335 ], [ 613, 335, 619, 332 ], [ 619, 332, 634, 325 ], [ 634, 325, 638, 323 ], [ 638, 323, 644, 319 ], [ 644, 319, 650, 315 ], [ 650, 315, 652, 314 ], [ 652, 314, 654, 313 ], [ 654, 313, 654, 313 ], [ 654, 313, 655, 312 ], [ 655, 312, 655, 312 ], [ 655, 312, 655, 312 ], [ 655, 312, 655, 312 ] ] }];
    const frame1: FrameData = {actions:frame1Actions,image:createMockImg(), frameNum:1}
    
    const frame2Actions: Action[] = [{ "color": "#000000", "radius": 5, "pos": [ [ 377, 136, 382, 136 ], [ 382, 136, 401, 136 ], [ 401, 136, 427, 136 ], [ 427, 136, 459, 136 ], [ 459, 136, 501, 136 ], [ 501, 136, 549, 136 ], [ 549, 136, 566, 136 ], [ 566, 136, 604, 136 ], [ 604, 136, 636, 136 ], [ 636, 136, 644, 136 ], [ 644, 136, 664, 136 ], [ 664, 136, 669, 136 ], [ 669, 136, 680, 136 ], [ 680, 136, 686, 136 ], [ 686, 136, 692, 136 ], [ 692, 136, 695, 136 ], [ 695, 136, 697, 136 ], [ 697, 136, 698, 136 ], [ 698, 136, 699, 136 ], [ 699, 136, 699, 136 ] ] }];
    const frame2: FrameData = {actions:frame2Actions, image:createMockImg(), frameNum:2}

    // mockedFrames.push(frame1);
    // mockedFrames.push(frame2);
    // return mockedFrames;
    return frame1;
}

export function createMockFrame2():FrameData {
    
    const frame2Actions: Action[] = [{ "color": "#000000", "radius": 5, "pos": [ [ 377, 136, 382, 136 ], [ 382, 136, 401, 136 ], [ 401, 136, 427, 136 ], [ 427, 136, 459, 136 ], [ 459, 136, 501, 136 ], [ 501, 136, 549, 136 ], [ 549, 136, 566, 136 ], [ 566, 136, 604, 136 ], [ 604, 136, 636, 136 ], [ 636, 136, 644, 136 ], [ 644, 136, 664, 136 ], [ 664, 136, 669, 136 ], [ 669, 136, 680, 136 ], [ 680, 136, 686, 136 ], [ 686, 136, 692, 136 ], [ 692, 136, 695, 136 ], [ 695, 136, 697, 136 ], [ 697, 136, 698, 136 ], [ 698, 136, 699, 136 ], [ 699, 136, 699, 136 ] ] }];
    const frame2: FrameData = {actions:frame2Actions, image:createMockImg(), frameNum:2}

    return frame2;
}

export function createMockFramesJSON() {
    return JSON.stringify(createMockFrame1());  
}



export default mockedFrames;
