const validateTimeLength = (time: string):boolean => {
  const timeSplitter = time.split(':');
  const validateLength = timeSplitter && timeSplitter.length <= 3;
  let validateUnit = false;
  timeSplitter.forEach((t) => validateUnit = t.length <= 5 && +t >= 0);

  const validated = validateLength && validateUnit;
  return validated;
};

export default validateTimeLength;