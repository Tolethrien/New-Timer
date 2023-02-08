type Durations = "short" | "medium" | "long";
type BuzzType = { [K in Durations]: number };

const vibrateOn = true;

const buzzTime: BuzzType = { short: 50, medium: 100, long: 150 };
export const vibrate = (duration: Durations) => {
  vibrateOn && navigator.vibrate(buzzTime[duration]);
};
