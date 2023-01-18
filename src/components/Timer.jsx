import React, { useState } from 'react'

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [display, setDisplay] = useState('00:00');
  const [timerDone, setTimerDone] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  const displayTime = () => {
    // restoreDisplayColors
    const displayMinutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;

    const formatMinutes = ((displayMinutes < 10) ? ('0' + displayMinutes) : displayMinutes);
    const formatSeconds = ((displaySeconds < 10) ? ('0' + displaySeconds) : displaySeconds);
  };

  const presetTime = ({ target: { value } }) => {
    const time = Number(value);
    setSeconds(time);
  };

  return (
    <div>Timer</div>
  )
}
