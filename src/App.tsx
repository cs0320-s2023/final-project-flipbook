import logo from './logo.svg';
import Whiteboard from './board';
import FrameInterface from './FrameInterface';
import mockedFrames from './frameMocks';

function App() {
  return (
    <div className="App">
      <FrameInterface frames={mockedFrames}/>
    </div>
  );
}

export default App;
