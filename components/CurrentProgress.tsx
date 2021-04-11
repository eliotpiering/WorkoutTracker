import * as React from "react";
import { StyleSheet } from "react-native";
import { Workout } from "../models/Workout";
import { Text, Button, View } from "./Themed";

type CurrentProgressProps = {
  workout: Workout;
};

type SupersetProgressProps = {
  key: number;
  name: string;
  totalLifts: number;
  totalSupersets: number;
  currentLift: number;
  active: boolean;
  complete: boolean;
};

export function CurrentProgress(props: CurrentProgressProps) {
  const supersets = (props.workout.supersets || []).map(function (superset, i) {
    return (
      <SupersetProgress
        key={i}
        active={props.workout.currentSet === i}
        complete={props.workout.currentSet > i}
        name={superset.name}
        totalLifts={superset.lifts.length}
        totalSupersets={props.workout.supersets.length}
        currentLift={props.workout.currentLift}
      />
    );
  });
  return <View style={styles.progressContainer}>{supersets}</View>;
}

function SupersetProgress(props: SupersetProgressProps) {
  let progress;
  if (props.active) {
    progress = (props.currentLift / props.totalLifts) * 100;
  } else if (props.complete) {
    progress = 100;
  } else {
    progress = 0;
  }

  const width = 100 / props.totalSupersets;
  return (
    <View style={supersetStyle(width)}>
      <Text>{props.name}</Text>
      <View style={progressbarStyle(progress)}>
        <Text>%</Text>
      </View>
    </View>
  );
}

const progressbarStyle = (progress) => {
  return {
    backgroundColor: "lightblue",
    width: "" + progress + "%",
  };
};
const supersetStyle = (width) => {
  return {
    padding: 10,
    width: "" + width + "%",
    textAlign: "center",
  };
};

const styles = StyleSheet.create({
  progressContainer: {
    margin: 1,
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
});
