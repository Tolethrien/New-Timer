type Durations = "short" | "medium" | "long";
type BuzzType = { [K in Durations]: number };

const vibrateOn = true;

const buzzTime: BuzzType = { short: 10, medium: 50, long: 100 };
export const vibrate = (duration: Durations) => {
  vibrateOn && navigator.vibrate(buzzTime[duration]);
};
