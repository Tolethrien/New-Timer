type Durations = "short" | "medium" | "long";
type BuzzType = { [K in Durations]: number };

const vibrateOn = true;

const buzzTime: BuzzType = { short: 5, medium: 30, long: 60 };
export const vibrate = (duration: Durations) => {
  vibrateOn && navigator.vibrate(buzzTime[duration]);
};
