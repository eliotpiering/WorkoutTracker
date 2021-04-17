import { WorkoutShort } from "../models/Workout";

export function deserializeWorkouts(json: Any): WorkoutShort {
  return json.map((workoutJson) => {
    return {
      id: workoutJson.id,
      name: workoutJson.name,
    };
  });
}
