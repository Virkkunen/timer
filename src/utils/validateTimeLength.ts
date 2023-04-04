const validateTimeLength = (time: number[]):boolean => {
  const validateTotalLength = time.join('').length <= 10;
  const validateLength = time && time.length <= 3;
  let validateUnit = false;
  time.forEach((t) => validateUnit = t <= 9999 && t >= 0);

  const validated = validateLength && validateUnit && validateTotalLength;
  return validated;
};

export default validateTimeLength;