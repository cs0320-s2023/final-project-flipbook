import React, { useState } from "react";
import Whiteboard from "./board";
import Thumbnail from "./Thumbnail";
import { Action, FrameData } from "./frameData";
import "./styles/FrameInterface.css";
import { createMockFramesJSON } from "./frameMocks";
import Save from "./Save.jsx";

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
  const [frameArray, setFrameArray] = useState<FrameData[]>(props.frames);
  const [currentFrame, setCurrentFrame] = useState<number>(0);

  const handleAddThumbnail = () => {
    const newFrameNum = frameArray.length + 1;
    const newFrameActions: Action[] = [
      {
        color: "#00ff00",
        radius: 5,
        pos: [
          [280, 312, 280, 311],
          [280, 311, 280, 308],
          [280, 308, 280, 303],
          [280, 303, 280, 293],
          [280, 293, 280, 282],
          [280, 282, 280, 268],
          [280, 268, 280, 252],
          [280, 252, 280, 235],
          [280, 235, 280, 229],
          [280, 229, 280, 215],
          [280, 215, 280, 201],
          [280, 201, 280, 198],
          [280, 198, 280, 192],
          [280, 192, 280, 186],
          [280, 186, 280, 182],
          [280, 182, 280, 180],
          [280, 180, 280, 179],
          [280, 179, 280, 179],
          [280, 179, 280, 179],
        ],
      },
    ];
    const newFrame: FrameData = {
      actions: newFrameActions,
      image: createBlankImage(),
      frameNum: newFrameNum,
    };
    setFrameArray((prevFrames) => [...prevFrames, newFrame]);
  };

  const handleThumbnailClick = (frame: FrameData) => {
    const frameIndex = frameArray.findIndex(
      (f) => f.frameNum === frame.frameNum
    );
    setCurrentFrame(frameIndex);
  };

  return (
    <>
      <div className="Frames">
        {frameArray.map((object: FrameData, i) => (
          <Thumbnail
            setCurrentFrame={(value: number) => setCurrentFrame(value)}
            key={i}
            data={object}
            onClick={handleThumbnailClick}
          />
        ))}
        <button className="addFrameButton" onClick={handleAddThumbnail}>
          +
        </button>
      </div>
      <div className="whiteboardDisplay">
        <Whiteboard
          displayedFrame={frameArray[currentFrame]}
          setCurrentFrame={(frameNum: number) => {
            const frameIndex = frameArray.findIndex(
              (f) => f.frameNum === frameNum
            );
            setCurrentFrame(frameIndex);
          }}
        />
      </div>
      <div className="Save">
        <Save frames={frameArray} />
      </div>
    </>
  );
}
