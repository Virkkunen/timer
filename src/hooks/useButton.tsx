import { useCallback, useContext, useState } from 'react';
import TimeContext from '../context/TimeContext';
import { ButtonState } from '../types/types';

export const useButton = (): ButtonState => {
  const {
    setTimeInput,
    setValidTime,
    setSeconds,
    seconds,
    validTime,
    setTimerActive,
    timerActive,
  } = useContext(TimeContext);

  const presetTime = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setTimeInput('');
    setValidTime(true);
    setSeconds(+e.currentTarget.value);
  }, []);

  const toggleTimer = useCallback(() => {
    if (!seconds || !validTime) return;
    setTimerActive(!timerActive);
  }, [seconds, validTime, timerActive]);

  const resetTimer = useCallback(() => {
    setTimeInput('');
    setValidTime(true);
    setSeconds(0);
  }, []);

  return {
    presetTime,
    toggleTimer,
    resetTimer,
  };
};
