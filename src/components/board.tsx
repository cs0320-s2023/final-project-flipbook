import React, { useState, useRef, useEffect } from "react";
import "../styles/board.css";
import { HsvaColor, ColorResult } from "@uiw/color-convert";
import { FrameData, Action } from "./frameData";
import Colorful from "@uiw/react-color-colorful";
import mockedFrames, {
  createMockFrame1,
  createMockFrame2,
} from "../mocks/frameMocks";
import { AddImage } from "./AddImage";

interface DrawState {
  color: string;
  x?: number;
  y?: number;
}

export interface WhiteboardProps {
  traceFrame: FrameData;
  displayedFrame: FrameData;
  setCurrentFrame: (n: number) => void;
}

// ColorWheel Interface
export interface ColorfulProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "color"> {
  prefixCls?: string;
  onChange?: (color: ColorResult) => void;
  color?: string | HsvaColor;
  disableAlpha?: boolean;
}

//helpers for Whiteboard
export function drawLine(
  boardRef: React.RefObject<HTMLCanvasElement>,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  width: number,
  opacity: number
): CanvasRenderingContext2D | undefined | null {
  if (boardRef != null && boardRef.current != null) {
    const context: undefined | CanvasRenderingContext2D | null =
      boardRef.current.getContext("2d");
    if (context instanceof CanvasRenderingContext2D) {
      context.globalAlpha = opacity;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.strokeStyle = color;
      context.lineCap = "round"; //make it so that a stroke is a circle, not a rectangle
      context.lineWidth = width;
      context.stroke();
      context.closePath();
      context.globalAlpha = 1.0;
      return context;
    }
  }
}

export function drawAction(
  boardRef: React.RefObject<HTMLCanvasElement>,
  a: Action
) {
  console.log("length", a.pos.length);
  for (var i = 0; i < a.pos.length; i++) {
    drawLine(
      boardRef,
      a.pos[i][0],
      a.pos[i][1],
      a.pos[i][2],
      a.pos[i][3],
      a.color,
      a.radius,
      a.opacity
    );
  }
  if (boardRef != null && boardRef.current != null) {
    const context: undefined | CanvasRenderingContext2D | null =
      boardRef.current.getContext("2d");
    if (context instanceof CanvasRenderingContext2D) {
      return boardRef.current.getContext("2d");
    }
  }
}

export default function Whiteboard(props: WhiteboardProps) {
  let current: DrawState = { color: "#000000" };

  const [currentColor, setCurrentColor] = useState<string>("#000000");
  const [currentWidth, setCurrentWidth] = useState<number>(5);
  const [actions, setActions] = useState<Action[]>();
  let currentActionPositions: number[][] = [];

  useEffect(() => {
    clearCanvas();
    props.traceFrame.actions.forEach((action) => {
      drawAction(boardRef, action);
    });
    props.displayedFrame.actions.forEach((action) => {
      drawAction(boardRef, action);
    });
    console.log("this should go when i click undo",props.displayedFrame.actions);
    if (boardRef != null && boardRef.current != null) {
      const context: undefined | CanvasRenderingContext2D | null =
        boardRef.current.getContext("2d");
      if (context instanceof CanvasRenderingContext2D) {
        props.displayedFrame.image = context.getImageData(0, 0, 800, 600)
      }
    }

    // clearAndPopulateCanvas("https://i.ibb.co/djvJMbM/8045-ADB9-EC9-F-4-D56-A1-E5-1-DA942-DC0031.jpg")
  }, [props.displayedFrame]);

  function throttledMouseMove(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    delay: number
  ) {
    var previousCall = new Date().getTime();
    return function () {
      var time = new Date().getTime();

      if (time - previousCall >= delay) {
        previousCall = time;
        mouseMove(e);
      }
    };
  }

  function mouseMove(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (!drawing) {
      return;
    }
    if (current.x != undefined && current.y != undefined) {
      // if (current.color == "#ffffff") {
      //   console.log("in the loop");
      //   for (var i = 0; i < currentActionPositions.length; i++) {
      //     for (var j = 0; j < currentActionPositions[i].length; j++) {
      //       if (current.x == currentActionPositions[i][j]) {
      //         currentActionPositions.splice(i, 1);
      //       }
      //     }
      //   }
      // }
      drawLine(
        boardRef,
        current.x,
        current.y,
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY,
        currentColor,
        currentWidth,
        1.0
      );
      currentActionPositions.push([
        current.x,
        current.y,
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY,
      ]);
    }
    // setCurrent(prev => ({
    //     ...prev,
    //     x:e.clientX,
    //     y:e.clientY
    // }));
    // current = {
    //     ...current,
    //     x:e.nativeEvent.clientX+e.nativeEvent.offsetX,
    //     y:e.nativeEvent.clientY+e.nativeEvent.offsetY
    // }
    current = {
      ...current,
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  }

  // function undo() {
  //   if (boardRef != null && boardRef.current != null) {
  //     const ctx: undefined | CanvasRenderingContext2D | null =
  //       boardRef.current.getContext("2d");
  //     if (ctx instanceof CanvasRenderingContext2D && actions != undefined) {
  //       ctx.clearRect(0, 0, 800, 600);
  //       for (var i = 0; i < actions.length - 1; i++) {
  //         if (i >= 0) {
  //           drawAction(actions[i]);
  //         }
  //       }
  //     }
  //   }
  // }

  function mouseUp(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (!drawing) {
      return;
    }
    setDrawing(false);
    if (current.x != undefined && current.y != undefined) {
      drawLine(
        boardRef,
        current.x,
        current.y,
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY,
        currentColor,
        currentWidth,
        1.0
      );
    }
    let addedAction: Action = {
      opacity: 1.0,
      color: currentColor,
      radius: currentWidth,
      pos: currentActionPositions,
    };
    if (actions != undefined) {
      setActions([...actions, addedAction]);
    } else {
      setActions([addedAction]);
    }
    currentActionPositions = [];
    props.displayedFrame.actions.push(addedAction);
    if (boardRef != null && boardRef.current != null) {
      const context: undefined | CanvasRenderingContext2D | null =
        boardRef.current.getContext("2d");
      if (context instanceof CanvasRenderingContext2D) {
        props.displayedFrame.image = context.getImageData(0, 0, 800, 600)

      }
    }
  }

  function clearCanvas() {
    if (boardRef != null && boardRef.current != null) {
      const context: undefined | CanvasRenderingContext2D | null =
        boardRef.current.getContext("2d");
      if (context instanceof CanvasRenderingContext2D) {
        context.clearRect(0, 0, 800, 600);
      }
    }
  }

  function mouseDown(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    setDrawing(true);
    currentActionPositions = [];
    current = {
      ...current,
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
    if (current.x != undefined && current.y != undefined) {
      currentActionPositions.push([
        current.x,
        current.y,
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY,
      ]);
    }
    if (resyncColors.indexOf(currentColor) == -1) {
      {
        setResyncColors([
          currentColor,
          resyncColors[0],
          resyncColors[1],
          resyncColors[2],
          resyncColors[3],
        ]);
      }
    }
  }

  const [drawing, setDrawing] = useState<boolean>(false);
  const maybeBoard = document.getElementsByClassName("board-canvas");

  const boardRef = useRef<HTMLCanvasElement | null>(null);
  function changeColor(colorHex: string) {
    setCurrentColor(colorHex);
  }

  const [hex, setHex] = useState("#59c09a");
  const [disableAlpha, setDisableAlpha] = useState(false);
  const [resyncColors, setResyncColors] = useState<string[]>([
    "#000000",
    "#ffffff",
    "#0000ff",
    "#00ff00",
    "#ff0000",
  ]);

  function changeStroke(e: React.ChangeEvent<HTMLInputElement>) {
    const parsedValue: number = parseInt(e.target.value);
    setCurrentWidth(parsedValue);
  }

  const [imageURL, setImageURL] = useState<string>(
    "https://i.ibb.co/djvJMbM/8045-ADB9-EC9-F-4-D56-A1-E5-1-DA942-DC0031.jpg"
  );

  return (
    <div className="whiteboard">
      <canvas
        className="whiteboardCanvas"
        width={800}
        height={600}
        onMouseDown={(e) => {
          mouseDown(e);
        }}
        onMouseUp={(e) => {
          mouseUp(e);
        }}
        onMouseMove={(e) => {
          mouseMove(e);
        }}
        onMouseLeave={(e) => mouseUp(e)}
        ref={boardRef}
      />
      {/* <button className="undoButton" onClick={() => undo()}>
        Undo
      </button> */}
      <div className="imageHandlers">
        <input
          type="text"
          value={imageURL}
          aria-label="image url input"
          onChange={(e) => setImageURL(e.target.value)}
        />
        <button className="setImageURL" aria-label="setImage button" onClick={() => setImageURL(imageURL)}>
          Set Image URL
        </button>

        <AddImage aria-label="addImage button" imageUrl={imageURL} boardRef={boardRef} props={props} />
      </div>
      <div className="colorPicker">
        <Colorful
          className="colorful"
          color={currentColor}
          aria-label={"selected color of hex: " + currentColor}
          onChange={(color) => changeColor(color.hex)}
        />
        <div className="controls">
          <div className="swatch-container">
            {resyncColors.map((color, i) => (
              <div
                key={i}
                className="color-swatch"
                aria-label={"color swatch with hex: " + color}
                style={{ backgroundColor: color }}
                onClick={() => setCurrentColor(color)}
              ></div>
            ))}
          </div>
          <div className="color-text">
            <span id="currentColor" style={{ color: "000000" }}>
              {currentColor}
            </span>
          </div>
          <div className="slider">
            <input
              type="range"
              min="1"
              max="80"
              value={currentWidth}
              onChange={changeStroke}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
