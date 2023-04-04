const formatSecondsToDisplay = (secs: number): string => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = secs % 60;

  const hourString = hours > 0 ? hours.toString().padStart(2, '0') + ':' : '';
  const minuteString = minutes.toString().padStart(2, '0') + ':';
  const secondString = seconds.toString().padStart(2, '0');

  return `${hourString}${minuteString}${secondString}`;
};

export default formatSecondsToDisplay;