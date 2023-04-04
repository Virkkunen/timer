import React, { useEffect, useMemo, useState } from 'react';
import { Props } from '../types/types';
import TimeContext from './TimeContext';
import validateTimeLength from '../utils/validateTimeLength';
import validateTimeReducer from '../utils/validateTimeReducer';
import validateNumber from '../utils/validateNumber';

const TimeProvider: React.FC<Props> = ({ children }) => {
  const [seconds, setSeconds] = useState(0);
  const [display, setDisplay] = useState('00:00');
  const [timeInput, setTimeInput] = useState('');
  const [validTime, setValidTime] = useState(true);

  useEffect(() => {
    const timeSplitter = timeInput.split(':').map(Number);
    if (!validateNumber(timeSplitter) || !validateTimeLength(timeSplitter)) {
      setValidTime(false);
      return;
    };
    setValidTime(true);
    const reducedTime = validateTimeReducer(timeSplitter);
    setSeconds(reducedTime);
  }, [timeInput]);

  const value = useMemo(
    () => ({
      seconds,
      display,
      timeInput,
      setTimeInput,
      validTime,
    }),
    [seconds, display, timeInput, setTimeInput, validTime]
  );

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};

export default TimeProvider;
