import logo from './logo.svg';
import Whiteboard from './board';
import FrameInterface from './FrameInterface';
import mockedFrames, { createMockFrame1, createMockFrame2 } from './frameMocks';

function App() {
  return (
    <div className="App">
      <FrameInterface frames={[createMockFrame1(),createMockFrame2()]}/>
    </div>
  );
}

export default App;
