import { Action, FrameData } from "./frameData";
import Whiteboard from "./board";
import Thumbnail from "./Thumbnail";
import "./styles/FrameInterface.css";
import { useState } from "react";

export interface FrameInterfaceProps {
  frames: FrameData[];
}

function createBlankImage() {
  const width = 100; // width of the image
  const height = 50; // height of the image
  const channels = 4; // number of channels (R, G, B, Alpha)

  // Create an array to hold the pixel data
  const imageData = new Uint8ClampedArray(width * height * channels);

  // Loop through each pixel and set its value
  for (let i = 0; i < width * height; i++) {
    const index = i * channels;
    imageData[index] = 255; // R channel
    imageData[index + 1] = 255; // G channel
    imageData[index + 2] = 255; // B channel
    imageData[index + 3] = 255; // Alpha channel (fully opaque)
  }

  // Create a new ImageData object using the pixel data
  const blankImageData = new ImageData(imageData, width, height);
  return blankImageData;
}

export default function FrameInterface(props: FrameInterfaceProps) {
  const [currentFrame, setCurrentFrame] = useState<FrameData>(props.frames[0]);
  const [frameArray, setFrameArray] = useState<FrameData[]>(props.frames);

  const handleAddThumbnail = () => {
    const frameNum = frameArray.length + 1;
    const newFrameActions: Action[] = [{}, {}];
    const newFrame: FrameData = {
      actions: newFrameActions,
      image: createBlankImage(),
      frameNum: frameNum + 1,
    };
    setFrameArray([...frameArray, newFrame]);
  };

  return (
    <div className="Frames">
      {frameArray.map((object: FrameData, i) => (
        <Thumbnail setCurrentFrame={setCurrentFrame} key={i} data={object} />
      ))}
      <button className="addFrameButton" onClick={handleAddThumbnail}>
        +
      </button>
      <div className="whiteboardDisplay">
        <Whiteboard
          currentFrame={currentFrame}
          setCurrentFrame={setCurrentFrame}
        />
      </div>
    </div>
  );
}
