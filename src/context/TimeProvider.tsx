import React, { useMemo, useState } from 'react';
import { Props } from '../types/types';
import TimeContext from './TimeContext';

const TimeProvider: React.FC<Props> = ({ children }) => {
  const [seconds, setSeconds] = useState(0);
  const [display, setDisplay] = useState('00:00');

  const value = useMemo(
    () => ({
      seconds,
      display,
    }),
    [seconds, display]
  );

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};

export default TimeProvider;
