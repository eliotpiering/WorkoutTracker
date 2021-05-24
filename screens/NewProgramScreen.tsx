import * as React from "react";
import { StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";

import { Text, Button, View, TextInput } from "../components/Themed";
import { NumberSelect } from "../components/NumberSelect";

/* import { Program } from "../models/Program";
 *
 * import { deserializeProgram } from "../serializers/ProgramSerializer";
 *  */
export default function NewProgram() {
  const [programName, setProgramName] = useState<string>("My Program");
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState<number>(4);
  const [totalWeeks, setTotalWeeks] = useState<number>(4);
  const save = function () {
    return true;
  };

  const preview = function (name, workoutsPerWeek, totalWeeks) {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const leftHeader = Array(workoutsPerWeek)
      .fill(0)
      .map(function (_, i) {
        const dayI = workoutsPerWeek - i < 5 - i ? i * 2 : i;
        const day = days[dayI];
        return (
          <View style={styles.previewColumn}>
            <Text>{day}</Text>
          </View>
        );
      });

    const rows = Array(totalWeeks)
      .fill(0)
      .map(function (_, row) {
        const columns = Array(workoutsPerWeek)
          .fill(0)
          .map(function (_, col) {
            return (
              <View style={styles.previewColumn}>
                <Text>Workout #{col + 1}</Text>
              </View>
            );
          });
        return (
          <View style={styles.previewRow}>
            <View style={styles.previewColumn}>
              <Text style={{ fontWeight: "bold" }}>Week #{row + 1}</Text>
            </View>

            {columns}
          </View>
        );
      });

    return (
      <View style={styles.fullRow}>
        <View style={styles.previewRow}>
          <View style={styles.previewColumn}>&nbsp;</View>
          {leftHeader}
        </View>
        {rows}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{programName} Program</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.fullRow}>
          <View style={styles.preview}>
            <Text>Preview of {programName}</Text>
            {preview(programName, workoutsPerWeek, totalWeeks)}
          </View>
        </View>
        <View style={styles.fullRow}>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={setProgramName}
              value={programName}
            />
          </View>
          <View>
            <Text>Workouts per Week</Text>
            <NumberSelect
              start={workoutsPerWeek}
              step={1}
              min={1}
              max={7}
              onChange={setWorkoutsPerWeek}
            />
          </View>
          <View>
            <Text>Total Weeks</Text>
            <NumberSelect
              start={totalWeeks}
              step={1}
              min={1}
              onChange={setTotalWeeks}
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={save}>
          <Text>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
  },
  header: {
    height: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  body: {
    flex: 3,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
    margin: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  fullRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  footer: {
    flex: 1,
    /* height: "25%", */
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    flexDirection: "row",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  separator: { height: 50 },
  button: {
    backgroundColor: "#2196F3",
    margin: 10,
    padding: 10,
    elevation: 2,
  },
  input: {
    margin: 22,
    borderWidth: 2,
    height: 50,
    fontSize: 14,
  },
  preview: {},
  previewRow: { padding: 10 },
  previewColumn: { padding: 10 },
});
