import { ProgramDay } from "./ProgramDay";

export interface Program {
  id: number;
  name: string;
  weeks: number;
  workoutsPerWeek: number;
  programDays: Array<ProgramDay>;
}
