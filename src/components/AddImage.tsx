import React, { useEffect } from "react";
import { WhiteboardProps, drawAction } from "./board";
import { Action } from "./frameData";

/**

React component to add an image to the whiteboard.
@param imageUrl - The URL of the image to be added.
@param boardRef - A mutable reference to the canvas element that the image will be added to.
@param props - The props of the whiteboard component.
*/
interface AddImageProps {
  imageUrl: string;
  boardRef: React.MutableRefObject<HTMLCanvasElement | null>;
  props: WhiteboardProps;
}


export const AddImage: React.FC<AddImageProps> = ({
  imageUrl,
  boardRef,
  props,
}) => {
  /**

    Function to draw a line on the canvas.
    @param x1 - The x-coordinate of the starting point of the line.
    @param y1 - The y-coordinate of the starting point of the line.
    @param x2 - The x-coordinate of the ending point of the line.
    @param y2 - The y-coordinate of the ending point of the line.
    @param color - The color of the line.
    @param width - The width of the line.
    @param opacity - The opacity of the line.
  */
  function drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    width: number,
    opacity: number
  ): void {
    if (boardRef != null && boardRef.current != null) {
      const context: undefined | CanvasRenderingContext2D | null =
        boardRef.current.getContext("2d");
      if (context instanceof CanvasRenderingContext2D) {
        context.globalAlpha = opacity
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = color;
        context.lineCap = "round"; //make it so that a stroke is a circle, not a rectangle
        context.lineWidth = width;
        context.stroke();
        context.closePath();
        context.globalAlpha = 1.0
      }
    }
  }
    /**

    Function to draw an action on the canvas.
    @param a - The action to be drawn.
    */
  function drawAction(a: Action) {
    for (var i = 0; i < a.pos.length; i++) {
      console.log(a.radius);
      drawLine(
        a.pos[i][0],
        a.pos[i][1],
        a.pos[i][2],
        a.pos[i][3],
        a.color,
        a.radius,
        a.opacity
      );
    }
  }

  /**

    Function to add an image to the canvas.
  */
  function addImage() {
    if (boardRef != null && boardRef.current != null) {
      const context: undefined | CanvasRenderingContext2D | null =
        boardRef.current.getContext("2d");
      if (context instanceof CanvasRenderingContext2D) {
        const image = new Image();


        image.src = imageUrl;

        // Once the image has loaded, draw it on the canvas
        image.crossOrigin = "Anonymous";
        //now need to choose opacity and choose image 
        image.onload = () => {
         try {

          context.clearRect(0, 0, 800, 600); 
          context.globalAlpha = 0.5
          context.drawImage(image, 0, 0, 800, 600);
          context.globalAlpha = 1.0
          props.displayedFrame.actions.forEach((action) => {
            drawAction(action);
          });
 } catch (error) {
            console.error("An error occurred while loading the image:", error);
          }

        //now need to choose opacity and choose image

        };
        props.displayedFrame.image = context.getImageData(0, 0, 800, 600)
      }
    }
  }

  return <button onClick={addImage}>Add Image</button>;
};