import { useContext } from "react";
import { clockContext } from "../providers/clockProvider";
const useClock = () => {
  const clock = useContext(clockContext);
  return clock;
};
export default useClock;
