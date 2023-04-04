import { useCallback, useContext } from 'react';
import Footer from './Footer';
import TimeContext from '../context/TimeContext';

const Timer = () => {
  const { seconds, display, timeInput, setTimeInput, validTime, presetTime } =
    useContext(TimeContext);

  // event: ChangeEvent<HTMLInputElement>
  const handleInputChange = useCallback(
    ({ target: { value } }: { target: { value: string } }) => {
      setTimeInput(value);
    },
    [timeInput]
  );

  return (
    <main className='flex flex-col max-lg:max-w-xs mx-auto bg-crust p-8 pb-2 rounded-lg md:max-w-lg md:p-10 md:pb-4'>
      <div className='bg-surface0 p-4 py-8 mb-8 text-center rounded-lg'>
        <span
          className={`font-mono font-medium ${
            display.length > 5 ? 'text-4xl xl:text-6xl' : 'text-6xl'
          }`}
        >
          {display}
        </span>
      </div>
      <div className='grid grid-rows-3 gap-4 place-items-center mb-6 max-lg:place-content-center md:gap-6'>
        <input
          type='text'
          name='custom-time'
          placeholder='1:19'
          onChange={handleInputChange}
          disabled={false}
          value={timeInput}
          className={`form-input font-mono font-medium text-lg text-center mt-0 block w-full md:mx-auto px-2 py-3 border-0 border-blue focus:ring-0 ${
            validTime
              ? 'focus:bg-surface1 bg-surface0'
              : 'focus:bg-red bg-red text-crust caret-peach'
          } rounded-lg caret-lavender transition-all ease-in-out duration-200 md:w-10/12`}
          autoFocus
        />
        <div className='grid grid-cols-3 grid-rows-1 gap-4 md:gap-6'>
          <button
            type='button'
            className='bg-blue font-mono font-bold px-4 py-3 rounded-lg text-base hover:brightness-110 active:opacity-60 disabled:bg-overlay2 disabled:text-surface1 transition-all ease-in-out duration-200 md:px-6 md:py-4 md:text-lg'
            name='5'
            value='300'
            disabled={false}
            onClick={presetTime}
          >
            5:00
          </button>
          <button
            type='button'
            className='bg-blue font-mono font-bold px-4 py-3 rounded-lg text-base hover:brightness-110 active:opacity-60 disabled:bg-overlay2 disabled:text-surface1 transition-all ease-in-out duration-200 md:px-6 md:py-4 md:text-lg'
            name='10'
            value='600'
            disabled={false}
            onClick={presetTime}
          >
            10:00
          </button>
          <button
            type='button'
            className='bg-blue font-mono font-bold px-4 py-3 rounded-lg text-base hover:brightness-110 active:opacity-60 disabled:bg-overlay2 disabled:text-surface1 transition-all ease-in-out duration-200 md:px-6 md:py-4 md:text-lg'
            name='15'
            value='900'
            disabled={false}
            onClick={presetTime}
          >
            15:00
          </button>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <button
            type='button'
            onClick={() => console.log('toggleTimer')}
            className={`bg-green font-medium px-4 py-3 rounded-lg text-base ${
              validTime && 'hover:brightness-110 active:opacity-60'
            } disabled:bg-overlay2 disabled:text-surface1 transition-all ease-in-out duration-200 md:px-6 md:py-4 md:text-lg`}
            disabled={!validTime}
          >
            Start
          </button>
          <button
            type='button'
            onClick={() => console.log('resetTimer')}
            className='bg-mauve font-medium px-4 py-3 rounded-lg text-base hover:brightness-110 active:opacity-60 transition-all ease-in-out duration-200 md:px-6 md:py-4 md:text-lg'
          >
            Reset
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Timer;
