import * as React from "react";
import { FlatList, StyleSheet } from "react-native";

import { Text, Button, View } from "../components/Themed";

import { Program } from "../models/Program";
import { deserializePrograms } from "../serializers/ProgramSerializer";

enum DataState {
  NotLoaded,
  Loading,
  Loaded,
}

export default function ProgramsScreen({ navigation }) {
  const [currentDataState, setDataState] = React.useState<DataState>(
    DataState.NotLoaded
  );
  const [program, updatePrograms] = React.useState<ProgramShort>([]);

  React.useEffect(() => {
    if (currentDataState !== DataState.NotLoaded) return;
    fetch("http://192.168.1.186:3000/programs/")
      .then((response) => response.json())
      .then((json) => {
        const program = deserializePrograms(json);
        updatePrograms(program);
        setDataState(DataState.Loaded);
      });

    setDataState(DataState.Loading);
  }, [currentDataState]);

  const renderProgramShort = ({ item }) => {
    return (
      <View style={styles.workoutItem}>
        <Button
          title={`Start ${item.name}`}
          onPress={() => {
            navigation.navigate("NewProgram", {
              programId: item.id,
            });
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Programs</Text>
      </View>
      <View style={styles.body}>
        <FlatList
          data={program}
          renderItem={renderProgramShort}
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
