import { ProgramLift } from "./ProgramLift";

export interface ProgramSuperset {
  id: number;
  name: string;
  position: number;
  restPeriod: number;
  programLifts: Array<ProgramLift>;
}
