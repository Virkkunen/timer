import React, { useEffect, useMemo, useState } from 'react';
import { Props } from '../types/types';
import TimeContext from './TimeContext';
import validateTimeLength from '../utils/validateAndSetTime';

const TimeProvider: React.FC<Props> = ({ children }) => {
  const [seconds, setSeconds] = useState(0);
  const [display, setDisplay] = useState('00:00');
  const [timeInput, setTimeInput] = useState('');

  useEffect(() => {
    console.log(validateTimeLength(timeInput));
  }, [timeInput]);

  const value = useMemo(
    () => ({
      seconds,
      display,
      timeInput,
      setTimeInput,
    }),
    [seconds, display, timeInput, setTimeInput]
  );

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};

export default TimeProvider;
