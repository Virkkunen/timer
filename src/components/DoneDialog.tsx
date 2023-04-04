import { useContext, Fragment, useCallback, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import TimeContext from '../context/TimeContext';

const DoneDialog = () => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const { timerDone, setTimerDone } = useContext(TimeContext);

  const closeDialog = useCallback(() => {
    audio!.pause();
    setAudio(null);
    setTimerDone(false);
  }, [timerDone]);

  useEffect(() => {
    const audioEl = new Audio('alarm.mp3');
    setAudio(audioEl);

    // clean up when unmounting
    return () => {
      audioEl.pause();
      audioEl.src = '';
    };
  }, [timerDone]);

  useEffect(() => {
    if (timerDone && audio) audio.play();
  }, [timerDone, audio]);

  return (
    <Transition show={timerDone} as={Fragment}>
      <Dialog onClose={closeDialog} className='relative z-50'>
        {/* blurred background */}
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 backdrop-blur-md' aria-hidden='true' />
        </Transition.Child>
        {/* actual dialog box */}
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div className='fixed inset-0 flex items-center justify-center p-4 drop-shadow hover:drop-shadow-lg'>
            <Dialog.Panel className='w-full max-w-sm rounded-md bg-mantle p-8'>
              <Dialog.Title className='font-bold text-lg mb-2'>
                Timer completed!
              </Dialog.Title>
              <button
                type='button'
                className='font-bold text-maroon mt-4 hover:text-red active:text-opacity-60 ease-in-out duration-200'
                onClick={closeDialog}
              >
                Close
              </button>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default DoneDialog;
