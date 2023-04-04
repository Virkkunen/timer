export interface Props {
  children: React.ReactNode;
}

export interface TimeContextInterface {
  seconds: number;
  display: string;
  timeInput: string | undefined;
  setTimeInput: (arg0: string) => void;
  validTime: boolean;
  presetTime: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  timerActive: boolean;
  setTimerActive: (arg0: boolean) => void;
  toggleTimer: () => void;
  resetTimer: () => void;
  setValidTime: (arg0: boolean) => void;
  setSeconds: (arg0: number) => void;
}

export interface ButtonState {
  presetTime: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  toggleTimer: () => void;
  resetTimer: () => void;
}