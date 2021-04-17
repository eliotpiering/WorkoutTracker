export interface Lift {
  exerciseId: number;
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

export function deserializeLift(liftJson: Any, attemptJson: Any): Lift {
  return {
    exerciseId: liftJson.exercise.id,
    targetWeight: attemptJson.target_weight,
    targetReps: attemptJson.target_reps,
    targetTime: attemptJson.target_time,
    leftAndRight: liftJson.left_and_right,
  };
}
