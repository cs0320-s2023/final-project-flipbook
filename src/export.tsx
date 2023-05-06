import { FrameInterfaceProps } from "./FrameInterface";
import ConvertApi from "convertapi-js";

let convertApi = ConvertApi.auth('M14k2t0rrCHHD7Ox')
export default function Export(props: FrameInterfaceProps){

    async function exportGif(){
        let convertApi = ConvertApi.auth('M14k2t0rrCHHD7Ox');

        try {
            const params = convertApi.createParams();
            props.frames.forEach((frame) => {
                //TODO: Convert the frame.image to a png 

                //pass in png here
                params.add('file', frame);
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