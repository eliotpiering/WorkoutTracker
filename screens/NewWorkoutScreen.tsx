import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, Button, View } from "../components/Themed";
import {
  Workout,
  initialWorkout,
  getCurrentLift,
  nextLift,
} from "../models/Workout";
import { Lift } from "./models/Lift";
import { useState, useEffect } from "react";

export default function TabOneScreen(props) {
  const [workout:Workout, updateWorkout] = useState(initialWorkout);

  let currentLift: Lift = getCurrentLift(workout);
  console.log(currentLift);
  return (
    <View style={styles.container}>
      <Text>{currentLift.exercise}</Text>
      <Text>Reps: {currentLift.targetReps}</Text>
      <Text>Weight: {currentLift.targetWeight}</Text>

      <Button
        onPress={() => updateWorkout(nextLift(workout))}
        style={styles.title}
        title="Next Lift"
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
