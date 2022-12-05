interface BuzzType {
  [key: string]: number;
}
const vibrateOn = true;
const buzzTime: BuzzType = { short: 50, medium: 100, long: 150 };
export const vibrate = (duration: string): void => {
  vibrateOn && navigator.vibrate(buzzTime[duration]);
};
