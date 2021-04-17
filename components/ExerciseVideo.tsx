import * as React from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { Workout } from "../models/Workout";
import { Text, Button, View } from "./Themed";
import { Video } from "expo-av";

import { useState } from "react";
type ExerciseVideoProps = { exerciseName: string };

export function ExerciseVideo(props: ExerciseVideoProps) {
  const videoError = (err) => {
    console.log("VIDEO ERROR" + err);
  };
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleVideoRef = (component) => {
    const playbackObject = component;
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Video
              source={{
                uri:
                  "https://ep-files.nyc3.cdn.digitaloceanspaces.com/spiderman.mkv",
              }} // Can be a URL or a local file.
              /* ref={(ref) => {
               *   this.player = ref;
               * }} // Store reference */
              /* onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={videoError} // Callback when video cannot be loaded */
              style={{ height: 300, width: 300 }}
              resizeMode="cover"
              shouldPlay
              isLooping
              useNativeControls
              ref={handleVideoRef}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Example</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    margin: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
