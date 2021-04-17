import { Exercise } from "../models/Exercise";

export function deserializeExercises(json: Any): Exercise {
  return json.map((json) => {
    return {
      id: json.id,
      name: json.name,
      video: json.video,
    };
  });
}
