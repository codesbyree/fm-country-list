export const toMS = (hours: number = 0, minutes: number = 0, seconds: number = 0) => {
  const hoursInMS = hours * 60 * 60 * 1000;
  const minutesInMS = minutes * 60 * 1000;
  const secondsInMS = seconds * 1000;
  return hoursInMS + minutesInMS + secondsInMS;
};
