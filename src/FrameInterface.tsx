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

  const handleAddThumbnail = () => {
    const newFrameNum = frameArray.length + 1;
    const newFrameActions: Action[] = [];
    const newFrame: FrameData = {
      actions: newFrameActions,
      image: createBlankImage(),
      frameNum: newFrameNum,
    };
    setFrameArray((prevFrames) => [...prevFrames, newFrame]);
  };

    function findFrameIndex(frameNum: number):number {
        for(var i=0;i<props.frames.length;i++) {
            if(props.frames[i].frameNum==frameNum) {
                return i;
            }
        }
        return -1;

    }

    const handleThumbnailClick = (frame: FrameData) => {
        // instead of just logging, we could use the setCurrentFrame fxn to change the frame that is being displayed
        console.log("hi")
        console.log(frame.actions)
        setCurrentFrame(findFrameIndex(frame.frameNum));

      };

    
    const [currentFrame,setCurrentFrame] = useState<number>(0);

    return (
        <>
        <div className="Frames">
            {props.frames.map((object:FrameData, i) => <Thumbnail 
            setCurrentFrame={(value:number)=>setCurrentFrame(findFrameIndex(value))} 
            handleThumbnailClick={handleThumbnailClick}
            key={i} data={object}
            onClick={handleThumbnailClick}
            />)}
            <button className="addFrameButton" onClick={handleAddThumbnail}>
          +
        </button>   
        </div>
        <div className="whiteboardDisplay">
            <Whiteboard displayedFrame={props.frames[currentFrame]} setCurrentFrame={(frameNum:number)=> {setCurrentFrame(findFrameIndex(frameNum))}}/>
        </div>
        <div className="Save">
            <Save frames={props.frames}  ></Save>
        </div>
        </>
    )
}
