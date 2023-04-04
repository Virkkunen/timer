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
}