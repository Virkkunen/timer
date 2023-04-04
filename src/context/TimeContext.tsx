import { createContext } from "react";
import { TimeContextInterface } from "../types/types";

const TimeContext = createContext<TimeContextInterface>({
  seconds: 0,
  display: '00:00',
  timeInput: undefined,
  setTimeInput: (arg0: string) => {},
  validTime: true,
  presetTime: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {},
});

export default TimeContext;