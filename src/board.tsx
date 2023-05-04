import React, { useState, useRef } from "react";
import "./styles/board.css";
import { HsvaColor, ColorResult } from "@uiw/color-convert";
import { FrameData } from "./frameData";
import Colorful from "@uiw/react-color-colorful";

interface DrawState {
  color: string;
  x?: number;
  y?: number;
}

export interface WhiteboardProps {
  currentFrame: FrameData;
  setCurrentFrame: (n: FrameData) => void;
}

// ColorWheel Interface
export interface ColorfulProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "color"> {
  prefixCls?: string;
  onChange?: (color: ColorResult) => void;
  color?: string | HsvaColor;
  disableAlpha?: boolean;
}

export default function Whiteboard(props: WhiteboardProps) {
  let current: DrawState = { color: "#000000" };

  const [currentColor, setCurrentColor] = useState<string>("#000000");
  const [currentWidth, setCurrentWidth] = useState<number>(5);

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
      drawLine(
        current.x,
        current.y,
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY,
        currentColor,
        currentWidth
      );
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

  function mouseUp(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (!drawing) {
      return;
    }
    setDrawing(false);
    if (current.x != undefined && current.y != undefined) {
      drawLine(
        current.x,
        current.y,
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY,
        currentColor,
        currentWidth
      );
    }
  }

  function mouseDown(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    setDrawing(true);
    console.log(currentColor);
    // setCurrent(prev => ({
    //     ...prev,
    //     x:e.clientX,
    //     y:e.clientY
    // }));
    current = {
      ...current,
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
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
  // const [current,setCurrent] = useState<DrawState>({
  //     color:'black'
  // });
  function changeColor(colorHex: string) {
    setCurrentColor(colorHex);
  }

  function drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    width: number
  ): void {
    console.log(currentColor);
    if (boardRef != null && boardRef.current != null) {
      const context: undefined | CanvasRenderingContext2D | null =
        boardRef.current.getContext("2d");
      if (context instanceof CanvasRenderingContext2D) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = color;
        context.lineCap = "round"; //make it so that a stroke is a circle, not a rectangle
        context.lineWidth = currentWidth;
        context.stroke();
        context.closePath();
      }
    }
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
        onMouseLeave={() => setDrawing(false)}
        ref={boardRef}
      />
      <div className="colorPicker">
        <Colorful
          className="colorful"
          color={currentColor}
          onChange={(color) => changeColor(color.hex)}
        />
        <div className="controls">
          <div className="swatch-container">
            {resyncColors.map((color, i) => (
              <div
                key={i}
                className="color-swatch"
                style={{ backgroundColor: color }}
                onClick={() => setCurrentColor(color)}
              ></div>
            ))}
          </div>
          <div className="color-text">
            <span id="currentColor" style={{ color: currentColor }}>
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
