import DoneDialog from './components/DoneDialog';
import Timer from './components/Timer';

function App() {
  return (
    <div className='grid grid-cols-1 h-screen my-auto place-content-center'>
      <DoneDialog />
      <Timer />
    </div>
  );
}

export default App;
