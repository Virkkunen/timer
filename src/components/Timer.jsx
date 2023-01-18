import React, { useState, useEffect } from 'react'
import Footer from './Footer';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [display, setDisplay] = useState('00:00');
  const [timerDone, setTimerDone] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeInput, setTimeInput] = useState(null);

  // change display value
  useEffect(() => {
    displayTime()
  }, [seconds])
  
  // timer functions
  useEffect(() => {
    let interval = null;
    
    if (timerActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!timerActive) {
      clearInterval(interval);
    } else if (timerActive && seconds === 0) {
      clearInterval(interval);
      setTimerActive(false);
      setTimerDone(true);
    }
    return () => clearInterval(interval);
  }, [timerActive, seconds]);

  // when timer is complete
  useEffect(() => {
    if (timerDone) timerComplete();
  }, [timerDone]);

  const displayTime = () => {
    // restoreDisplayColors
    const displayMinutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;

    const formatMinutes = ((displayMinutes < 10) ? ('0' + displayMinutes) : displayMinutes);
    const formatSeconds = ((displaySeconds < 10) ? ('0' + displaySeconds) : displaySeconds);
    const display = `${formatMinutes}:${formatSeconds}`;
    setDisplay(display);
  };

  const presetTime = ({ target: { value } }) => {
    const time = Number(value);
    setSeconds(time);
  };

  const toggleTimer = () => {
    if (seconds <= 0) return console.log('Invalid time');
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setSeconds(0);
    setTimerActive(false);
  };
  
  const timerComplete = () => {
    new Audio('alarm.mp3').play();
    setDisplay('Timer complete!');
    setTimerDone(false);
  };

  return (
    <div className='timer-div'>
        <span id='timer'>{ display }</span>
        <div className='controls'>
          <label htmlFor='custom-time'>
            <input
              type="text"
              name='custom-time'
              placeholder='Time, eg.: 1:19 or 79'
              onChange={ () => {} }
              id="time-input" 
              disabled={ timerActive }
            />
          </label>
          <div className='presets'>
            <button
              type='button'
              className='blue mono'
              name='5'
              value='300'
              disabled={ timerActive }
              onClick={ presetTime }
            >
              5:00
            </button>
            <button
              type='button'
              className='blue mono'
              name='10'
              value='600'
              disabled={ timerActive }
              onClick={ presetTime}
            >
              10:00
            </button>
            <button
              type='button'
              className='blue mono'
              name='15'
              value='900'
              disabled={ timerActive }
              onClick={ presetTime }
            >
              15:00
            </button>
          </div>
          <div className='control-buttons'>
            <button 
              type='button' 
              className={ `${!timerActive ? 'green' : 'red'} sans` } 
              onClick={ toggleTimer }
            >
              { `${!timerActive ? 'Start' : 'Stop'}` }
            </button>
            <button
              type='button'
              className='purple sans'
              onClick={ resetTimer }
            >
              Reset
            </button>
          </div>
        </div>
        <Footer />
      </div>
  )
}
