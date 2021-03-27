import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, Button, View } from "../components/Themed";
import { Timer } from "../components/Timer";
import {
  Workout,
  emptyWorkout,
  nextLift,
  deserializeWorkout,
  getCurrentLift,
} from "../models/Workout";
import { Lift } from "../models/Lift";

enum DataState {
  NotLoaded,
  Loading,
  Loaded,
}

export default function NewWorkout() {
  const [currentDataState, setDataState] = React.useState<DataState>(
    DataState.NotLoaded
  );
  const [workout, updateWorkout] = React.useState<Workout>(emptyWorkout);

  React.useEffect(() => {
    if (currentDataState !== DataState.NotLoaded) return;
    fetch("http://localhost:3000/workouts/1")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const workout = deserializeWorkout(json);
        updateWorkout(workout);
        setDataState(DataState.Loaded);
      });

    setDataState(DataState.Loading);
  }, [currentDataState]);

  const updateToNextWorkout = () => updateWorkout(nextLift(workout));

  let currentLift: Lift | null = getCurrentLift(workout);

  const [showTimer, setShowTimer] = React.useState<boolean>(
    currentLift && !!currentLift.targetTime
  );

  if (!currentLift) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>No Workout Loaded</Text>
        </View>
      </View>
    );
  } else {
    let timer;
    if (showTimer) {
      timer = (
        <Timer
          liftId={currentLift.exercise}
          time={currentLift.targetTime}
          onTimerEnd={() => {}}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{currentLift.exercise}</Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.body}>
          {!!currentLift.targetReps && (
            <Text>Reps: {currentLift.targetReps}</Text>
          )}
          <Text>Weight: {currentLift.targetWeight}</Text>
          {showTimer && <Text>Target Time: {currentLift.targetTime}</Text>}
          {!!timer && timer}
        </View>
        <View style={styles.footer}>
          <Button onPress={updateToNextWorkout} title="Next Lift"></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  header: {
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  separator: { height: 50 },
});
