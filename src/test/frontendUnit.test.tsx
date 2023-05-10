import React, { useRef } from "react";
import { render, fireEvent } from "@testing-library/react";
import Whiteboard from "../components/board";
import { FrameData } from "../components/frameData";

import { convertToFrameDataList, createImageDataFromActionData } from "../components/frameData";


describe("createImageDataFromActionData", () => {
  it("should return an ImageData object", () => {
    const fa = {
      frameNum: 1,
      actions: [
        {
          opacity: 1,
          color: "#000000",
          radius: 5,
          pos: [[0, 0, 100, 100]],
        },
      ],
    };
    const imageData = createImageDataFromActionData(fa);
    expect(imageData).toBeInstanceOf(ImageData);
  });

  it("should draw lines on the canvas", () => {
    const fa = {
      frameNum: 1,
      actions: [
        {
          opacity: 1,
          color: "#000000",
          radius: 5,
          pos: [[0, 0, 100, 100]],
        },
      ],
    };
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    jest.spyOn(context, "stroke");
    const imageData = createImageDataFromActionData(fa);
    expect(context.stroke).toHaveBeenCalled();
  });
});

describe("convertToFrameDataList", () => {
  it("should return an array of FrameData objects", () => {
    const fas = [
      {
        frameNum: 1,
        actions: [
          { opacity: 1, color: "#000000", radius: 5, pos: [[0, 0, 100, 100]] },
        ],
      },
    ];
    const frameDataList = convertToFrameDataList(fas);
    expect(frameDataList).toBeInstanceOf(Array);
    expect(frameDataList[0]).toMatchObject({
      frameNum: 1,
      actions: [
        {
          opacity: 1,
          color: "#000000",
          radius: 5,
          pos: [[0, 0, 100, 100]],
        },
      ],
      image: expect.any(ImageData),
    });
  });
});


// describe("Drawing functions", () => {
//   describe("drawLine", () => {
//     it("should draw a line with given parameters", () => {
//       const canvas = document.createElement("canvas");
//       const boardRef = useRef<HTMLCanvasElement | null>(null);

//       canvas.width = 100;
//       canvas.height = 100;
//       document.body.appendChild(canvas);

//       const context = canvas.getContext("2d");
//       if (context) {
//         const result = drawLine(10, 10, 90, 90, "#FF0000", 5, boardRef);

//         expect(result).toEqual(context);

//         const imageData = context.getImageData(
//           0,
//           0,
//           canvas.width,
//           canvas.height
//         );
//         const pixel = imageData.data;

//         // Check the first and last pixel of the line to see if it's drawn correctly
//         expect(pixel[0]).toBe(255);
//         expect(pixel[1]).toBe(0);
//         expect(pixel[2]).toBe(0);
//         expect(pixel[3]).toBe(255);

//         expect(pixel[pixel.length - 4]).toBe(255);
//         expect(pixel[pixel.length - 3]).toBe(0);
//         expect(pixel[pixel.length - 2]).toBe(0);
//         expect(pixel[pixel.length - 1]).toBe(255);
//       }
//     });
//   });


//   describe("drawAction", () => {
//     it("should draw a line for each position in the given action", () => {
//       const canvas = document.createElement("canvas");
//       const boardRef = useRef<HTMLCanvasElement | null>(null);

//       canvas.width = 100;
//       canvas.height = 100;
//       document.body.appendChild(canvas);

//       const context = canvas.getContext("2d");
//       if (context) {
//         const action = {
//           pos: [
//             [10, 10, 90, 90],
//             [20, 20, 80, 80],
//             [30, 30, 70, 70],
//           ],
//           color: "#FF0000",
//           radius: 5,
//         };



//         expect(result).toEqual(context);

//         const imageData = context.getImageData(
//           0,
//           0,
//           canvas.width,
//           canvas.height
//         );
//         const pixel = imageData.data;

//         // Check the pixels of the lines to see if they're drawn correctly
//         expect(pixel[0]).toBe(255);
//         expect(pixel[1]).toBe(0);
//         expect(pixel[2]).toBe(0);
//         expect(pixel[3]).toBe(255);

//         expect(pixel[404]).toBe(255);
//         expect(pixel[405]).toBe(0);
//         expect(pixel[406]).toBe(0);
//         expect(pixel[407]).toBe(255);

//         expect(pixel[808]).toBe(255);
//         expect(pixel[809]).toBe(0);
//         expect(pixel[810]).toBe(0);
//         expect(pixel[811]).toBe(255);
//       }
//     });
//   });
// });
