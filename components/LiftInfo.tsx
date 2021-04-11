import * as React from "react";
import { StyleSheet } from "react-native";
import { Workout } from "../models/Workout";
import { Text, Button, View } from "./Themed";

type LiftInfoProps = {
  reps: number;
  weight: number;
  time: number;
};

export function LiftInfo(props: LiftInfoProps) {
  return (
    <View style={styles.liftInfoContainer}>
      {props.reps && (
        <Text style={styles.info}>
          Reps {"\n"} {props.reps}
        </Text>
      )}
      {props.weight && (
        <Text style={styles.info}>
          Weight{"\n"} {props.weight}
        </Text>
      )}
      {props.time && (
        <Text style={styles.info}>
          Time{"\n"} {props.time}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  liftInfoContainer: {
    flex: 1,
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
  },
  info: {
    padding: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
