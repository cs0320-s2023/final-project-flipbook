import { FrameData } from "./frameData";

interface ExportProps {
  frames: FrameData[];
}

function createMockImg(
  width: number,
  height: number,
  channels: number
): ImageData {
  const imageData = new Uint8ClampedArray(width * height * channels);

  // Loop through each pixel and set its value
  for (let i = 0; i < width * height; i++) {
    const index = i * channels;
    imageData[index] = Math.random() * 255; // R channel
    imageData[index + 1] = Math.random() * 255; // G channel
    imageData[index + 2] = Math.random() * 255; // B channel
    imageData[index + 3] = 255; // Alpha channel (fully opaque)
    // console.log('working ',i);
  }

  // console.log(imageData);
  // Create a new ImageData object using the pixel data
  const mockedImageData = new ImageData(imageData, width, height);
  return mockedImageData;
}

export default function Export(props: ExportProps) {
  function animate() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Append the canvas element to a container element in the document
    const container = document.getElementById("canvasContainer");
    if (container && ctx instanceof CanvasRenderingContext2D) {
      container.appendChild(canvas);
    }

    function displayFrame(index: number) {
      if (index >= props.frames.length) {
        // All frames have been displayed, stop the animation
        return;
      }

      if (ctx instanceof CanvasRenderingContext2D) {
        const frame = props.frames[index];
        canvas.width = frame.image.width;
        canvas.height = frame.image.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(createMockImg(frame.image.width, frame.image.height, 4), 0, 0);
        console.log(ctx.getImageData(0, 0, frame.image.width, frame.image.height))
      }

      // Schedule the next frame to be displayed after 500 milliseconds (0.5 seconds)
      setTimeout(function () {
        displayFrame(index + 1);
      }, 500);
    }

    // Start the animation by displaying the first frame
    displayFrame(0);
  }

  return (
    <>
      <button onClick={animate}>Animate</button>
      <div
        id="canvasContainer"
        style={{ width: "100%", height: "100%", position: "relative" }}
      ></div>
    </>
  );
}

// function animate(){
//     var canvas = document.createElement("canvas");
//     var ctx: undefined | CanvasRenderingContext2D | null =
//     canvas.getContext("2d");
//     props.frames.forEach(function (frame) {
//       setTimeout(function(){
//           console.log("Executed after 0.5 second");
//       }, 500);
//       if (ctx instanceof CanvasRenderingContext2D) {
//         ctx.putImageData(createMockImg(frame.image.width, frame.image.height, 4), 0, 0);
//         console.log(ctx.getImageData(0, 0, frame.image.width, frame.image.height))
//       }
//     });
// }
// return (<>
//     <button onClick={animate}>Export</button>
//     </>
//   );
