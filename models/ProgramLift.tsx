export interface ProgramLift {
  id: number;
  exerciseId: number;
  position: number;
  weeklyLifts: Array<Array<SimpleLift>>;
}

interface SimpleLift {
  reps: number;
  time: number;
  weight: number;
}
