import { Lift, cloneLift } from "./Lift";

export interface Workout {
  name: string;
  startedAt: date;
  currentSet: number;
  currentLift: number;
  lifts: Array<Array<Lift>>;
}

export const initialWorkout: Workout = {
  name: "Week 2 - Day 1",
  startedAt: Date.now(),
  currentSet: 0,
  currentLift: 0,
  lifts: [
    [
      {
        exercise: "Single leg lift",
        targetWeight: 0,
        targetReps: 10,
        leftAndRight: true,
      },
      { exercise: "Yoga Pushups", targetWeight: 0, targetReps: 12 },
      { exercise: "Bodyweight Squats", targetWeight: 0, targetReps: 10 },

      {
        exercise: "Single leg lift",
        targetWeight: 0,
        targetReps: 10,
        leftAndRight: true,
      },
      { exercise: "Yoga Pushups", targetWeight: 0, targetReps: 12 },
      { exercise: "Bodyweight Squats", targetWeight: 0, targetReps: 10 },
    ],
    [
      {
        exercise: "Single Leg Weight in Back Leg",
        targetWeight: 30,
        targetReps: 10,
        leftAndRight: true,
      },
      {
        exercise: "Kickstand RDL",
        targetWeight: 40,
        targetReps: 10,
        leftAndRight: true,
      },

      {
        exercise: "Single Leg Weight in Back Leg",
        targetWeight: 30,
        targetReps: 10,
        leftAndRight: true,
      },
      {
        exercise: "Kickstand RDL",
        targetWeight: 40,
        targetReps: 10,
        leftAndRight: true,
      },

      {
        exercise: "Single Leg Weight in Back Leg",
        targetWeight: 30,
        targetReps: 10,
        leftAndRight: true,
      },
      {
        exercise: "Kickstand RDL",
        targetWeight: 40,
        targetReps: 10,
        leftAndRight: true,
      },
    ],
    [
      { exercise: "Side Plank", targetTime: 30, leftAndRight: true },

      { exercise: "Hollow Hold", targetTime: 30, targetWeight: 30 },

      { exercise: "Side Plank", targetTime: 30, leftAndRight: true },

      { exercise: "Hollow Hold", targetTime: 30, targetWeight: 30 },

      { exercise: "Side Plank", targetTime: 30, leftAndRight: true },

      { exercise: "Hollow Hold", targetTime: 30, targetWeight: 30 },
    ],
  ],
};

export function getCurrentLift(workout: Workout): Lift {
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
