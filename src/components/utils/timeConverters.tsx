export const convertTimeToString: (sec: number) => string = (sec) => {
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);
  let seconds = sec - hours * 3600 - minutes * 60;
  return (
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0")
  );
};

export const convertTimeToNumber: (time: string) => number = (time: string) => {
  let value = time.split(":");
  return Number(value[0]) * 3600 + Number(value[1]) * 60 + Number(value[2]);
};
