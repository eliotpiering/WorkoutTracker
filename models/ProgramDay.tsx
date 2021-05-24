import { ProgramSuperset } from "./ProgramSuperset";

export interface ProgramDay {
  id: number;
  name: string;
  position: number;
  programSupersets: Array<ProgramSuperset>;
}

export interface ProgramDayShort {
  id: number;
  name: string;
  position: number;
}
