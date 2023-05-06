import { FrameInterfaceProps } from "./FrameInterface";
import ConvertApi from "convertapi-js";
import { FrameData } from "./frameData";

export default function Export(props: FrameInterfaceProps){

    async function exportGif(){
        let convertApi = ConvertApi.auth('M14k2t0rrCHHD7Ox');

        try {
            const params = convertApi.createParams();
            props.frames.forEach(async (frame: FrameData) => {
               const pngFile = await createPngFile(frame.image);

               params.add('file', pngFile);
            });
        
            const result = await convertApi.convert("png", "gif", params);
        
            const url = result.files[0].Url;
        
            const a = document.createElement("a");
            a.href = url;
            a.download = "animation.gif";
            a.click();
            } catch (error) {
            console.error(error);
            }
      }

      async function createPngFile(imageData: ImageData): Promise<File> {
        const canvas = document.createElement('canvas');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.putImageData(imageData, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], "frame.png", { type: blob.type });
            return file;
        } else {
            throw new Error("Could not create canvas context.");
        }
    }

    return (
        <button onClick={exportGif}>Export</button>
    );
}