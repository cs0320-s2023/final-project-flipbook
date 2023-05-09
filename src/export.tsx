import { FrameInterfaceProps } from "./FrameInterface";
import ConvertApi from "convertapi-js";
import { Action, FrameData } from "./frameData";

export default function Export(props: FrameInterfaceProps){

    async function exportGif(){
        let convertApi = ConvertApi.auth('M14k2t0rrCHHD7Ox');

        try {
            const params = convertApi.createParams();
            props.frames.forEach(async (frame: FrameData) => {
               const pngFile = await createPngFile(frame.actions);

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

    

    return (
        <button onClick={exportGif}>Export</button>
    );
} 

export async function createPngFile(actions: Action[]): Promise<File> {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d'); 
        if (ctx) {
          for (let i = 0; i < actions.length; i++) {
            const action = actions[i];
            ctx.strokeStyle = action.color;
            ctx.lineWidth = action.radius;
            ctx.lineCap = "round";
            ctx.beginPath();
            const positions = action.pos;
            ctx.moveTo(positions[0][0], positions[0][1]);
            for (let j = 1; j < positions.length; j++) {
              ctx.lineTo(positions[j][0], positions[j][1]);
            }
            ctx.stroke();
          }
          const dataUrl = canvas.toDataURL('image/png');
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], "frame.png", { type: blob.type });
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = "animation.png";
          a.click();
          console.log(file)
          return file;
        } else {
          throw new Error("Could not create canvas context.");
        }
      }

