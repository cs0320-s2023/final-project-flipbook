import React, { useEffect } from 'react';
import { WhiteboardProps } from './board';
import { Action } from './frameData';

interface AddImageProps {
  imageUrl: string;
  boardRef: React.MutableRefObject<HTMLCanvasElement | null>;
  props: WhiteboardProps
}

export const AddImage: React.FC<AddImageProps> = ({ imageUrl, boardRef, props,  }) => {

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
          context.clearRect(0, 0, 800, 600); 
          context.globalAlpha = 0.5
          context.drawImage(image, 0, 0, 800, 600);
          context.globalAlpha = 1.0
          props.displayedFrame.actions.forEach((action) => {
            drawAction(action);
          });
        };
        props.displayedFrame.image = context.getImageData(0, 0, 800, 600)
      }
    }
  }
  
  
    
  return (
    <button onClick={addImage}>Add Image</button>
  );
  
}