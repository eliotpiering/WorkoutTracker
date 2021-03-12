export interface Lift {
  exercise: string;
  targetWeight: number;
  targetReps: number;
  targetTime: number;
  gotWeigth: number;
  gotReps: number;
  leftAndRight: boolean;
}

export function cloneLift(l: Lift): Lift {
  return { ...l };
}
