import React, { useRef, useEffect, useState } from "react";
import Whiteboard from "./board";
import Thumbnail from "./Thumbnail";
import { Action, FrameActionData, FrameData } from "./frameData";
import "../styles/FrameInterface.css";
import { createMockFramesJSON } from "../mocks/frameMocks";
import Save from "./Save.jsx";
import Export from "./Export";
import { useSearchParams } from "react-router-dom";

export interface FrameInterfaceProps {
  frames: FrameData[];
}

function createBlankImage() {
  const width = 80; // width of the image
  const height = 60; // height of the image
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
  const [traceChecked, setChecked] = React.useState(false);
  const [params] = useSearchParams();
  const pid = params.get('pid');

  useEffect(() => {
    setFrameArray(props.frames);
  }, props.frames);

  const handleChange = () => {
    setChecked(!traceChecked);
  };
  const boardRef = useRef<HTMLCanvasElement | null>(null);

  const handleAddThumbnail = () => {
    const newFrameNum = frameArray.length + 1;
    const newFrameActions: Action[] = [];
    const newFrame: FrameData = {
      actions: newFrameActions,
      image: createBlankImage(),
      frameNum: newFrameNum,
    };
    setCurrentFrame(newFrameNum - 1);
    const traceFrame: FrameData = {
      actions: structuredClone(frameArray[frameArray.length - 1].actions).map(
        (action) => ({
          ...action,
          opacity: 0.3,
        })
      ),
      image: createBlankImage(),
      frameNum: newFrameNum,
    };
    if (traceChecked) {
      setFrameArray((prevFrames) => [...prevFrames, traceFrame]);
    } else {
      setFrameArray((prevFrames) => [...prevFrames, newFrame]);
    }
  };

  //handles the undo action --> should we add a redo?
  const handleUndoAction = () => {
    setFrameArray((prevFrames) => {
      const newFrameArray = [...prevFrames]; // Create a copy of prevFrames
      const currentFrameData = newFrameArray[currentFrame];
      const updatedActions = currentFrameData.actions.slice(0, -1); // Remove the last action
      const updatedFrameData = { ...currentFrameData, actions: updatedActions };
      newFrameArray[currentFrame] = updatedFrameData;
      return newFrameArray;
    });
  };

  const handleRemoveThumbnail = () => {
    if (frameArray.length != 1) {
      const newFrameArray = frameArray.filter(
        (frame) => frame.frameNum !== frameArray.length
      );
      setFrameArray(newFrameArray);
      setCurrentFrame(frameArray.length - 2);
    }
  };

  function findFrameIndex(frameNum: number): number {
    for (let i = 0; i < frameArray.length; i++) {
      if (frameArray[i].frameNum === frameNum) {
        return i;
      }
    }
    return -1;
  }

  const handleThumbnailClick = (frame: FrameData) => {
    setCurrentFrame(findFrameIndex(frame.frameNum));
    console.log("clicked", frame);
  };

  const [currentFrame, setCurrentFrame] = useState<number>(0);

  function removeImageData(framesInput: FrameData[]): FrameActionData[] {
    let res: FrameActionData[] = [];
    framesInput.forEach((fd) => {
      res.push({
        frameNum: fd.frameNum,
        actions: fd.actions,
      });
    });
    return res;
  }

  return (
    <>
      <div className="frameContainer">
        <div className="frameList" role="list">
          {frameArray.map((object: FrameData, i) => (
            <Thumbnail
              setCurrentFrame={(value: number) =>
                setCurrentFrame(findFrameIndex(value))
              }
              handleThumbnailClick={handleThumbnailClick}
              key={i}
              data={object}
              onClick={handleThumbnailClick}
              aria-label={`Thumbnail ${i + 1}`}
              // frameNumber={object.frameNum}
            />
          ))}
          <div className="buttonContainer">
            <button
              className="addFrameButton"
              onClick={handleAddThumbnail}
              aria-label="Add Frame"
            >
              +
            </button>
            <button
              className="removeFrameButton"
              onClick={handleRemoveThumbnail}
              aria-label="Remove Frame"
            >
              –
            </button>
          </div>
          <label className="traceBox">
            <input
              type="checkbox"
              id="trace"
              checked={traceChecked}
              onChange={handleChange}
              aria-checked={traceChecked}
            />
            <span aria-hidden="true">Trace</span>
          </label>
        </div>
        <div className="whiteboardDisplay">
          <Whiteboard
            traceFrame={
              traceChecked
                ? frameArray[frameArray.length - 1]
                : frameArray[currentFrame]
            }
            displayedFrame={frameArray[currentFrame]}
            setCurrentFrame={(frameNum: number) =>
              setCurrentFrame(findFrameIndex(frameNum))
            }
            aria-label="Whiteboard"
          />
          <div className="animate">
            <Export
              frames={frameArray}
              aria-label="Export Animation"
            ></Export>
          </div>
        </div>
        <div className="buttonContainer2">
          <div className="undoButton">
            <button onClick={handleUndoAction} aria-label="Undo">
              Undo
            </button>
          </div>
          <div className="save">
            <Save
              frames={removeImageData(frameArray)}
              aria-label="Save Animation"
              urlpid={pid}
            ></Save>
          </div>
        </div>
      </div>
    </>
  );
}

