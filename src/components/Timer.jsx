import React, { useState, useEffect, useCallback } from 'react'
import Footer from './Footer';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [display, setDisplay] = useState('00:00');
  const [timerDone, setTimerDone] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeInput, setTimeInput] = useState('');
  const [timeValid, setTimeValid] = useState(false);

 
  
  // timer functions
  useEffect(() => {
    let interval = null;
    
    if (timerActive && seconds > 0 && timeValid) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!timerActive) { // pause
      clearInterval(interval);
    } else if (timerActive && seconds === 0) { // when it's done
      clearInterval(interval);
      setTimerActive(false);
      setTimerDone(true);
    }
    return () => clearInterval(interval);

  }, [timerActive, seconds, timeValid]);

  // input colors (there is a better way of doing this)
  const inputColors = useCallback((option) => {
    const input = document.getElementById('time-input');
    const timer = document.getElementById('timer');

    switch (option) {
      case 'invalid':
        input.style.backgroundColor = 'var(--red)';
        input.style.color = 'var(--bg0)';
        break;
      case 'complete':
        timer.style.backgroundColor = 'var(--green)';
        timer.style.color = 'var(--bg0)';
      break;
      case 'restore':
        input.style.backgroundColor = 'var(--bg3)';
        input.style.color = 'var(--fg1)';
        timer.style.backgroundColor = 'var(--bg1)';
        timer.style.color = 'var(--fg0)';
        break;
      default:
        break;
    };
  }, []);

  // functions section
  // converts seconds to display (79 to 01:19)
  const displayTime = useCallback(() => {
    inputColors('restore');
    const displayMinutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    // could use String.padLeft
    const formatMinutes = ((displayMinutes < 10) ? ('0' + displayMinutes) : displayMinutes);
    const formatSeconds = ((displaySeconds < 10) ? ('0' + displaySeconds) : displaySeconds);
    const display = `${formatMinutes}:${formatSeconds}`;
    setDisplay(display);
  }, [inputColors, seconds]);

  // sets time to preset buttons
  const presetTime = ({ target: { value } }) => setSeconds(Number(value));

  const toggleTimer = () => (seconds && timeValid) && setTimerActive(!timerActive);

  const resetTimer = useCallback(() => {
    setSeconds(0);
    setTimeInput('');
    setTimerActive(false);
    setTimerDone(false);
  }, [setSeconds, setTimeInput, setTimerActive, setTimerDone]);
  
  const timerComplete = useCallback(() => {
    new Audio('alarm.mp3').play();
    setDisplay('Timer complete!');
    inputColors('complete');
    resetTimer();
  }, [setDisplay, inputColors, resetTimer]);

  const validateTimeInputLength = useCallback((time) => {
    const validateLength = time && time.length <= 3;
    let validateUnit = false;
    for (let i in time) {
      validateUnit = time[i].length <= 10 && time[i] >= 0;
    }
    const timeValidated = validateLength && validateUnit;
    setTimeValid(timeValidated);
    return timeValidated;
  }, [setTimeValid]);

  const validateTimeReduce = useCallback((time) => {
    const typeOfTime = (typeof time === 'number');
    const timeNotNegative = time >= 0;
    const reduceValidated = typeOfTime && timeNotNegative;
    setTimeValid(reduceValidated);
    return reduceValidated;
  }, [setTimeValid]);

  const validateAndSetTime = useCallback(() => {
    const timeSplitter = timeInput.split(':');

    const timeLengthValidated = validateTimeInputLength(timeSplitter);
    if (!timeLengthValidated) return;
  
    const time = +timeSplitter.reduce((acc, time) => (60 * acc) + + time);
    if (!validateTimeReduce(time)) return;

    setSeconds(time);
  }, [validateTimeInputLength, validateTimeReduce, setSeconds, timeInput]);

  const handleInputChange = useCallback(({ target: { value } }) => setTimeInput(value), [setTimeInput]);

  // when timer is complete
  useEffect(() => { timerDone && timerComplete() }, [timerDone, timerComplete]);

  // change display value
  useEffect(() => displayTime(), [seconds, displayTime]);

  // manual time input
  useEffect(() => validateAndSetTime(), [timeInput, validateAndSetTime]);

  // time valid
  useEffect(() => { timeValid ? inputColors('restore') : inputColors('invalid') }, [timeValid, inputColors]);

  return (
    <div className='timer-div'>
        <span id='timer'>{ display }</span>
        <div className='controls'>
          <label htmlFor='custom-time'>
            <input
              type="text"
              name='custom-time'
              placeholder='Time, eg.: 1:19 or 79'
              onChange={ handleInputChange }
              id="time-input" 
              disabled={ timerActive }
              value={ timeInput }
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
              onClick={ presetTime }
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
