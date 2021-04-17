import { Lift, cloneLift, deserializeLift } from "./Lift";
import { Superset } from "./Superset";

export interface Workout {
  name: string;
  startedAt: date;
  currentSet: number;
  currentLift: number;
  supersets: Array<Superset>;
}

export interface WorkoutShort {
  id: number;
  name: string;
}

export const emptyWorkout: Workout = {
  name: "",
  startedAt: null,
  currentSet: 0,
  currentLift: 0,
  supersets: [],
  /* supersets: [
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

export function getCurrentLift(workout: Workout): Lift | RestBlock {
  if (workout.supersets.length === 0) return null;
  /* console.table(workout); */
  return workout.supersets[workout.currentSet].lifts[workout.currentLift];
}

export function nextLift(w: Workout): Workout {
  let updatedWorkout = cloneWorkout(w);
  if (w.currentLift === w.supersets[w.currentSet].lifts.length - 1) {
    //At the end of a set
    if (w.currentSet === w.supersets.length - 1) {
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

export interface Workout {
  name: string;
  startedAt: date;
  currentSet: number;
  currentLift: number;
  supersets: Array<Array<Lift>>;
}

function cloneWorkout(w: Workout): Workout {
  const newWorkout = { ...w };
  newWorkout.supersets = w.supersets.map((sett) => {
    const lifts = sett.lifts.map((l) => {
      return cloneLift(l);
    });
    return { name: sett.name, lifts: lifts };
  });
  return newWorkout;
}
