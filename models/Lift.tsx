export interface Lift {
  exerciseId: number;
  targetWeight: number;
  targetReps: number;
  targetTime: number;
  gotWeigth: number;
  gotReps: number;
  leftAndRight: boolean;
}

export interface RestBlock {
  time: number;
}
export function isRestBlock(lift: Lift | RestBlock | null): lift is RestBlock {
  if (lift === null) return false;
  return (lift as Lift).exerciseId === undefined;
}

export function isLift(lift: Lift | RestBlock | null): lift is Lift {
  if (lift === null) return false;
  return (lift as Lift).exerciseId !== undefined;
}

export function cloneLift(l: Lift): Lift {
  return { ...l };
}

export function deserializeLift(liftJson: Any, attemptJson: Any): Lift {
  return {
    exerciseId: liftJson.exercise.id,
    targetWeight: attemptJson.target_weight,
    targetReps: attemptJson.target_reps,
    targetTime: attemptJson.target_time,
    leftAndRight: liftJson.left_and_right,
  };
}

export function restBlock(time: number): RestBlock {
  return {
    time: time,
  };
}
