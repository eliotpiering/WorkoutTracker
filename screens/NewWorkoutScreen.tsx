import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, Button, View } from "../components/Themed";
import { Timer } from "../components/Timer";
import {
  Workout,
  emptyWorkout,
  nextLift,
  getCurrentLift,
} from "../models/Workout";

import { deserializeWorkout } from "../serializers/WorkoutSerializer";
import { deserializeExercises } from "../serializers/ExerciseSerializer";
import { Lift, RestBlock, isLift, isRestBlock } from "../models/Lift";
import { CurrentProgress } from "../components/CurrentProgress";
import { LiftInfo } from "../components/LiftInfo";
import { ExerciseVideo } from "../components/ExerciseVideo";

enum DataState {
  NotLoaded,
  Loading,
  Loaded,
}

export default function NewWorkout({ route }) {
  const { workoutId } = route.params;

  const [currentDataState, setDataState] = React.useState<DataState>(
    DataState.NotLoaded
  );
  const [workout, updateWorkout] = React.useState<Workout>(emptyWorkout);
  const [exercises, updateExercises] = React.useState<Workout>([]);

  React.useEffect(() => {
    if (currentDataState !== DataState.NotLoaded) return;
    fetch(`http://192.168.1.186:3000/workouts/${workoutId}`)
      .then((response) => response.json())
      .then((json) => {
        const workout = deserializeWorkout(json);
        const exercises = deserializeExercises(json["exercises"]);
        updateExercises(exercises);
        updateWorkout(workout);
        setDataState(DataState.Loaded);
      });

    setDataState(DataState.Loading);
  }, [currentDataState]);

  const updateToNextWorkout = () => updateWorkout(nextLift(workout));

  let currentLift: Lift | RestBlock | null = getCurrentLift(workout);

  const [showTimer, setShowTimer] = React.useState<boolean>(
    currentLift && !!currentLift.targetTime
  );

  const exercise = exercises.find((ex) => {
    if (isRestBlock(currentLift)) return false;

    return currentLift && ex.id == currentLift.exerciseId;
  });

  /* ----------------------------------------------------------------------------------------------------
     LIFT BODY VIEW
  ---------------------------------------------------------------------------------------------------- */
  let liftView;
  if (isLift(currentLift)) {
    liftView = (
      <>
        <Text style={styles.title}>{exercise.name}</Text>
        <LiftInfo
          reps={currentLift.targetReps}
          weight={currentLift.targetWeight}
          time={currentLift.targetTime}
        />

        {currentLift && !!currentLift.targetTime && (
          <Timer
            resetId={exercise.id}
            time={currentLift.targetTime}
            onTimerEnd={() => {}}
          />
        )}
      </>
    );
  } else if (isRestBlock(currentLift)) {
    liftView = (
      <>
        <Text style={styles.title}>Rest...</Text>
        <Timer
          resetId={currentLift.time.toString()}
          time={currentLift.time}
          startImmediately={true}
          onTimerEnd={updateToNextWorkout}
        />
      </>
    );
  }

  /* ----------------------------------------------------------------------------------------------------
     Main View
  ---------------------------------------------------------------------------------------------------- */
  if (!currentLift) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>No Workout Loaded</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <CurrentProgress workout={workout} />
        </View>
        <View style={styles.body}>{liftView}</View>

        <View style={styles.footer}>
          <Button onPress={updateToNextWorkout} title="Next Lift"></Button>
        </View>

        {!!exercise && <ExerciseVideo exercise={exercise} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    /* marginTop: "5%", */
    height: "100%",
  },
  header: {
    height: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 3,
    /* height: "50%", */
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  footer: {
    flex: 1,
    /* height: "25%", */
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  separator: { height: 50 },
});
