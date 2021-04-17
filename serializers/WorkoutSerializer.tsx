import { WorkoutShort, Workout } from "../models/Workout";
import { deserializeLift } from "../models/Lift";

export function deserializeWorkouts(json: Any): WorkoutShort {
  return json.map((workoutJson) => {
    return {
      id: workoutJson.id,
      name: workoutJson.name,
    };
  });
}

export function deserializeWorkout(json: Any): Workout {
  const newSupersets = json.supersets.map((superset) => {
    let liftIndex = 0;
    let attemptIndex = 0;
    let newSuperset = { name: superset.name, lifts: [] };
    while (true) {
      /* console.log(`Lift INDEX ${liftIndex}`);
       * console.log(`ATTEMPT UNDEX ${attemptIndex}`);
       * console.log(`newsupersets ${newSuperset}`); */
      const liftJson = superset.lifts[liftIndex];
      if (!liftJson) {
        /* No lift start a new round */
        /* FIXME: could add breaks here */
        liftIndex = 0;
        attemptIndex += 1;
      } else {
        const attemptJson = liftJson.lift_attempts[attemptIndex];
        if (!!attemptJson) {
          const nextLift = deserializeLift(liftJson, attemptJson);
          /* console.table(nextLift); */
          newSuperset.lifts.push(nextLift);
          liftIndex += 1;
        } else {
          /* No attempt so we done with this supserset*/
          /* FIXME its possible to miss attempts here, if the earlier supersets in the superset have fewer attmpts than the later supersets */
          return newSuperset;
        }
      }
    }
  }, []);
  return {
    name: json.name,
    startedAt: json.start_at,
    currentSet: 0,
    currentLift: 0,
    supersets: newSupersets,
  };
}
