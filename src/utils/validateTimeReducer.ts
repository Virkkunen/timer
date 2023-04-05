const validateTimeReducer = (time: number[]): number => {
  const timeReduced = time.reduce((acc: number, t: number) => 60 * acc + +t, 0);
  // I guess the TypeScript already validates if it's a number so it's fine?
  return timeReduced;
};

export default validateTimeReducer;
