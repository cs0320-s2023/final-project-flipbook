import logo from './logo.svg';
import Whiteboard from './board';
import FrameInterface from './FrameInterface';
import mockedFrames, { createMockFrame1, createMockFrame2 } from '../mocks/frameMocks';
import { BrowserRouter, useSearchParams } from "react-router-dom";
import { convertToFrameDataList } from './frameData';
import { FrameActionData, FrameData } from './frameData';
import { useState, useEffect } from 'react';

export default function Flipbook() {
  const [frames, setFrames] = useState<FrameData[]>([createMockFrame1(), createMockFrame2()]);


  /**

    Get the frame data from the server for a specified project ID.
    @async
    @function getData
    @param {string} pid - The project ID to retrieve the frame data for.
    @returns {Promise<void>} - A promise that resolves when the frame data has been retrieved and set to state.
    @throws {Error} - If there is an error fetching or parsing the response data.
*/  
  async function getData(pid:string) {
    const url = `http://localhost:3001/data?pid=${pid}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.frameData) {
        const converted = convertToFrameDataList(data.frameData);
        console.log("conv",converted);
        setFrames(converted);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const [params] = useSearchParams();
  const pid = params.get('pid');
  
  useEffect(() => {
    if (pid) {
        console.log("using server data")
      getData(pid);
    } else {
        console.log("using mock data")
      setFrames([createMockFrame1(), createMockFrame2()]);
    }
  }, [pid]);

  return (
    <div className="App">
      <FrameInterface frames={frames} />
    </div>
  );
}
