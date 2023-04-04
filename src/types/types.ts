export interface Props {
  children: React.ReactNode;
}

export interface TimeContextInterface {
  seconds: number;
  display: string;
  timeInput: string | undefined;
  setTimeInput: (arg0: string) => void;
}