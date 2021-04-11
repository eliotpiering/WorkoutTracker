import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { View, Text, Button } from "./Themed";

type TimerProps = {
  liftId: string;
  time: number;
  onTimerEnd: any;
};

export function Timer(props: TimerProps) {
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  const toggle = () => {
    setIsActive(!isActive);
  };

  function reset() {
    setSeconds(0);
    setIsActive(false);
    setIsEnded(false);
  }

  useEffect(() => {
    reset();
  }, [props.liftId]);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      if (seconds >= props.time) {
        props.onTimerEnd();
        setIsActive(false);
        setIsEnded(true);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  if (isEnded) {
    return (
      <View style={styles.emptyContainer} onPress={toggle}>
        <Text>Done</Text>
      </View>
    );
  } else {
    return (
      <TouchableOpacity style={styles.timerContainer} onPress={toggle}>
        <Text style={styles.timer}>{isActive ? seconds.toString() : "GO"}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "center",
    minWidth: 200,
    backgroundColor: "#DDDDDD",
    padding: 10,
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "center",
    minWidth: 200,
    padding: 10,
    alignItems: "center",
  },

  timer: {
    fontSize: 50,
    fontWeight: "bold",
    color: "black",
  },
});
