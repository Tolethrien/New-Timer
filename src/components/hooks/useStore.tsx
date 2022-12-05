import { useContext } from "react";
import { appContext } from "../providers/appProvider";
import { clockContext } from "../providers/clockProvider";

interface storesType {
  [key: string]: React.Context<any>;
}
const UseStore = (store: string) => {
  const stores: storesType = { app: appContext, clock: clockContext };
  return useContext(stores[store]);
};
export default UseStore;
