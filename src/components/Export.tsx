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
  }

  // Create a new ImageData object using the pixel data
  const mockedImageData = new ImageData(imageData, width, height);
  return mockedImageData;
}

export default function Export(props: ExportProps) {
  function animate() {
    const frameWindow = window.open("", "_blank");

    if (!frameWindow) {
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    frameWindow.document.body.appendChild(canvas);

    let frameIndex = 0;

    function displayNextFrame() {
      if (frameIndex >= props.frames.length) {
        // All frames have been displayed, close the window/tab
        frameWindow?.close();
        return;
      }

      const frame = props.frames[frameIndex];
      canvas.width = frame.image.width;
      canvas.height = frame.image.height;
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.putImageData(frame.image, 0, 0);

      frameIndex++;

      // Schedule the next frame to be displayed after 500 milliseconds (0.5 seconds)
      setTimeout(displayNextFrame, 500);
    }

    // Start the animation by displaying the first frame
    displayNextFrame();
  }

  return (
    <>
      <button className="animate" onClick={animate}>
        Animate
      </button>
    </>
  );
}
