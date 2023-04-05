import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Props } from '../types/types';
import TimeContext from './TimeContext';
import validateTimeLength from '../utils/validateTimeLength';
import validateTimeReducer from '../utils/validateTimeReducer';
import validateNumber from '../utils/validateNumber';
import formatSecondsToDisplay from '../utils/formatSecondsToDisplay';
import { useButton } from '../hooks/useButton';

const TimeProvider: React.FC<Props> = ({ children }) => {
  const [seconds, setSeconds] = useState(0);
  const [display, setDisplay] = useState('00:00');
  const [timeInput, setTimeInput] = useState('');
  const [validTime, setValidTime] = useState(true);
  const [timerActive, setTimerActive] = useState(false);
  const [timerDone, setTimerDone] = useState(false);

  const { presetTime, toggleTimer, resetTimer } = useButton();

  // validates and sets seconds state
  useEffect(() => {
    if (!timeInput) return;
    const timeSplitter = timeInput.split(':').map((num) => Math.round(Number(num)));
    if (!validateNumber(timeSplitter) || !validateTimeLength(timeSplitter)) {
      setValidTime(false);
      return;
    }
    setValidTime(true); // in case an invalid value was provided first
    const reducedTime = validateTimeReducer(timeSplitter);
    setSeconds(reducedTime);
  }, [timeInput]);

  // converts seconds to display
  useEffect(() => setDisplay(formatSecondsToDisplay(seconds)), [seconds]);

  // the timer interval
  useEffect(() => {
    let timerInterval: number | undefined;

    if (timerActive && seconds > 0 && validTime) {
      timerInterval = setInterval(() => setSeconds((seconds) => seconds - 1), 1000);
    }

    return () => clearInterval(timerInterval);
  }, [timerActive, seconds]);

  // the timer handler
  useEffect(() => {
    if (seconds === 0 && timerActive) {
      setTimerActive(false);
      setTimerDone(true);
      setTimeInput('');
    }
  }, [seconds, timerActive]);

  const value = useMemo(
    () => ({
      seconds,
      display,
      timeInput,
      setTimeInput,
      validTime,
      presetTime,
      timerActive,
      setTimerActive,
      toggleTimer,
      resetTimer,
      setValidTime,
      setSeconds,
      timerDone,
      setTimerDone,
    }),
    [
      seconds,
      display,
      timeInput,
      setTimeInput,
      validTime,
      presetTime,
      timerActive,
      setTimerActive,
      toggleTimer,
      resetTimer,
      setValidTime,
      setSeconds,
      timerDone,
      setTimerDone,
    ]
  );

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};

export default TimeProvider;
