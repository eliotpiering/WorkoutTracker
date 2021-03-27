import { Lift, cloneLift, deserializeLift } from "./Lift";

export interface Workout {
  name: string;
  startedAt: date;
  currentSet: number;
  currentLift: number;
  lifts: Array<Array<Lift>>;
}

export const emptyWorkout: Workout = {
  name: "",
  startedAt: null,
  currentSet: 0,
  currentLift: 0,
  lifts: [],
  /* lifts: [
     *   [
     *     {
     *       exercise: "Single leg lift",
     *       targetWeight: 0,
     *       targetReps: 10,
     *       targetTime: 2,
     *       leftAndRight: true,
     *     },
     *     {
     *       exercise: "Yoga Pushups",
     *       targetWeight: 0,
     *       targetReps: 12,
     *       targetTime: 2,
     *     },
     *     {
     *       exercise: "Bodyweight Squats",
     *       targetWeight: 0,
     *       targetReps: 10,
     *     },

     *     {
     *       exercise: "Single leg lift",
     *       targetWeight: 0,
     *       targetReps: 10,
     *       targetTime: 5,
     *       leftAndRight: true,
     *     },
     *     { exercise: "Yoga Pushups", targetWeight: 0, targetReps: 12 },
     *     { exercise: "Bodyweight Squats", targetWeight: 0, targetReps: 10 },
     *   ],
     *   [
     *     {
     *       exercise: "Single Leg Weight in Back Leg",
     *       targetWeight: 30,
     *       targetReps: 10,
     *       leftAndRight: true,
     *     },
     *     {
     *       exercise: "Kickstand RDL",
     *       targetWeight: 40,
     *       targetReps: 10,
     *       leftAndRight: true,
     *     },

     *     {
     *       exercise: "Single Leg Weight in Back Leg",
     *       targetWeight: 30,
     *       targetReps: 10,
     *       leftAndRight: true,
     *     },
     *     {
     *       exercise: "Kickstand RDL",
     *       targetWeight: 40,
     *       targetReps: 10,
     *       leftAndRight: true,
     *     },

     *     {
     *       exercise: "Single Leg Weight in Back Leg",
     *       targetWeight: 30,
     *       targetReps: 10,
     *       leftAndRight: true,
     *     },
     *     {
     *       exercise: "Kickstand RDL",
     *       targetWeight: 40,
     *       targetReps: 10,
     *       leftAndRight: true,
     *     },
     *   ],
     *   [
     *     { exercise: "Side Plank", targetTime: 30, leftAndRight: true },

     *     { exercise: "Hollow Hold", targetTime: 30, targetWeight: 30 },

     *     { exercise: "Side Plank", targetTime: 30, leftAndRight: true },

     *     { exercise: "Hollow Hold", targetTime: 30, targetWeight: 30 },

     *     { exercise: "Side Plank", targetTime: 30, leftAndRight: true },

     *     { exercise: "Hollow Hold", targetTime: 30, targetWeight: 30 },
     *   ],
     * ], */
};

export function getCurrentLift(workout: Workout): Lift {
  if (workout.lifts.length === 0) return null;
  /* console.table(workout); */
  return workout.lifts[workout.currentSet][workout.currentLift];
}

export function nextLift(w: Workout): Workout {
  let updatedWorkout = cloneWorkout(w);
  if (w.currentLift === w.lifts[w.currentSet].length - 1) {
    //At the end of a set
    if (w.currentSet === w.lifts.length - 1) {
      // At the end of the workout
      console.log("WORKOUT DONE");
      updatedWorkout.currentSet = 0;
      updatedWorkout.currentLift = 0;
    } else {
      // Start a new Set
      updatedWorkout.currentSet = w.currentSet + 1;
      updatedWorkout.currentLift = 0;
    }
  } else {
    //Start a new lift
    updatedWorkout.currentLift = w.currentLift + 1;
  }
  return updatedWorkout;
}

export function deserializeWorkout(json: Any): Workout {
  const lifts = json.supersets.map((superset) => {
    let liftIndex = 0;
    let attemptIndex = 0;
    let supersetLifts = [];
    while (true) {
      /* console.log(`Lift INDEX ${liftIndex}`); */
      /* console.log(`ATTEMPT UNDEX ${attemptIndex}`); */
      /* console.log(`superset lifts ${supersetLifts}`); */
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
          supersetLifts.push(nextLift);
          liftIndex += 1;
        } else {
          /* No attempt so we done with this supserset*/
          /* FIXME its possible to miss attempts here, if the earlier lifts in the superset have fewer attmpts than the later lifts */
          return supersetLifts;
        }
      }
    }
  }, []);
  return {
    name: json.name,
    startedAt: json.start_at,
    currentSet: 0,
    currentLift: 0,
    lifts: lifts,
  };
}

export interface Workout {
  name: string;
  startedAt: date;
  currentSet: number;
  currentLift: number;
  lifts: Array<Array<Lift>>;
}

function cloneWorkout(w: Workout): Workout {
  const newWorkout = { ...w };
  newWorkout.lifts = w.lifts.map((sett) => {
    return sett.map((l) => {
      return cloneLift(l);
    });
  });
  return newWorkout;
}
