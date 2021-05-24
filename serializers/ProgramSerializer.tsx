import { Program } from "../models/Program";
import { ProgramDay } from "../models/ProgramDay";

export function deserializePrograms(json: Any): Program {
  return json.map((programJson) => {
    const programDaysShort = programJson.program_days.map((programDay) => {
      return {
        name: programDay.name,
        position: programDay.position,
        programSupersets: [],
      };
    });

    return {
      id: programJson.id,
      name: programJson.name,
      weeks: programJson.weeks,
      workoutsPerWeek: programJson.workouts_per_week,
      programDays: programDaysShort,
    };
  });
}
