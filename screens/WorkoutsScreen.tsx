import * as React from "react";
import { FlatList, StyleSheet } from "react-native";

import { Text, Button, View } from "../components/Themed";

import { WorkoutShort } from "../models/Workout";
import { deserializeWorkouts } from "../serializers/WorkoutSerializer";

enum DataState {
  NotLoaded,
  Loading,
  Loaded,
}

export default function WorkoutsScreen({ navigation }) {
  const [currentDataState, setDataState] = React.useState<DataState>(
    DataState.NotLoaded
  );
  const [workouts, updateWorkouts] = React.useState<WorkoutShort>([]);

  React.useEffect(() => {
    if (currentDataState !== DataState.NotLoaded) return;
    fetch("http://192.168.1.186:3000/workouts/")
      .then((response) => response.json())
      .then((json) => {
        const workouts = deserializeWorkouts(json);
        updateWorkouts(workouts);
        setDataState(DataState.Loaded);
      });

    setDataState(DataState.Loading);
  }, [currentDataState]);

  const renderWorkoutShort = ({ item }) => {
    return (
      <View style={styles.workoutItem}>
        <Button
          title={`Start ${item.name}`}
          onPress={() => {
            navigation.navigate("NewWorkout", {
              workoutId: item.id,
            });
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workouts</Text>
      </View>
      <View style={styles.body}>
        <FlatList
          data={workouts}
          renderItem={renderWorkoutShort}
          keyExtractor={(workout) => workout.id.toString()}
        />
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
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  workoutItem: {
    alignItems: "center",
    height: 50,
    padding: 20,
    margin: 20,
  },
  workoutItemButton: {
    fontSize: 20,
  },
});
