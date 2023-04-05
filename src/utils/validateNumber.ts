const validateNumber = (time: number[]): boolean => !time.some((num) => isNaN(num));

export default validateNumber;
