import React, { useRef } from "react";
import { render, fireEvent } from "@testing-library/react";
import Whiteboard from "../src/board";
import { FrameData } from "../src/frameData";

import { drawAction, drawLine } from "../src/board";

describe("Drawing functions", () => {
  describe("drawLine", () => {
    it("should draw a line with given parameters", () => {
      const canvas = document.createElement("canvas");
      const boardRef = useRef<HTMLCanvasElement | null>(null);

      canvas.width = 100;
      canvas.height = 100;
      document.body.appendChild(canvas);

      const context = canvas.getContext("2d");
      if (context) {
        const result = drawLine(10, 10, 90, 90, "#FF0000", 5, boardRef);

        expect(result).toEqual(context);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const pixel = imageData.data;

        // Check the first and last pixel of the line to see if it's drawn correctly
        expect(pixel[0]).toBe(255);
        expect(pixel[1]).toBe(0);
        expect(pixel[2]).toBe(0);
        expect(pixel[3]).toBe(255);

        expect(pixel[pixel.length - 4]).toBe(255);
        expect(pixel[pixel.length - 3]).toBe(0);
        expect(pixel[pixel.length - 2]).toBe(0);
        expect(pixel[pixel.length - 1]).toBe(255);
      }
    });
  });

  describe("drawAction", () => {
    it("should draw a line for each position in the given action", () => {
      const canvas = document.createElement("canvas");
      const boardRef = useRef<HTMLCanvasElement | null>(null);

      canvas.width = 100;
      canvas.height = 100;
      document.body.appendChild(canvas);

      const context = canvas.getContext("2d");
      if (context) {
        const action = {
          pos: [
            [10, 10, 90, 90],
            [20, 20, 80, 80],
            [30, 30, 70, 70],
          ],
          color: "#FF0000",
          radius: 5,
        };

        const result = drawAction(action, boardRef);

        expect(result).toEqual(context);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const pixel = imageData.data;

        // Check the pixels of the lines to see if they're drawn correctly
        expect(pixel[0]).toBe(255);
        expect(pixel[1]).toBe(0);
        expect(pixel[2]).toBe(0);
        expect(pixel[3]).toBe(255);

        expect(pixel[404]).toBe(255);
        expect(pixel[405]).toBe(0);
        expect(pixel[406]).toBe(0);
        expect(pixel[407]).toBe(255);

        expect(pixel[808]).toBe(255);
        expect(pixel[809]).toBe(0);
        expect(pixel[810]).toBe(0);
        expect(pixel[811]).toBe(255);
      }
    });
  });
});
