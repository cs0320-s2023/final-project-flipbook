import React from 'react';

interface AddImageProps {
  imageUrl: string;
  boardRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

export const AddImage: React.FC<AddImageProps> = ({ imageUrl, boardRef }) => {
  function addImage() {
    if (boardRef != null && boardRef.current != null) {
      const context: undefined | CanvasRenderingContext2D | null =
        boardRef.current.getContext("2d");
      if (context instanceof CanvasRenderingContext2D) {
        // Clear the canvas
        context.clearRect(0, 0, 800, 600);
  
        const image = new Image();
  
        image.src = imageUrl;
        
        // Once the image has loaded, draw it on the canvas
        image.onload = () => {
          // const aspectRatio = image.width / image.height;

          // // Calculate the new width and height to fit the canvas
          // let newWidth, newHeight;
          // if (aspectRatio > 1) {
          //   newWidth = 800;
          //   newHeight = 800 / aspectRatio;
          // } else {
          //   newWidth = 600 * aspectRatio;
          //   newHeight = 600;
          // }
          context.globalAlpha = 0.5;

          // // Draw the image on the canvas with the calculated dimensions
          
          context.drawImage(image, 0, 0, 800, 600);
          context.globalAlpha = 1.0
        };
      }
    }
  }
    
  return (
    <button onClick={addImage}>addImage</button>
  );
  
}