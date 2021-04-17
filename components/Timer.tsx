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
  const [endTime, setEndTime] = useState<number>(null);
  const [msRemaining, setMsRemaining] = useState<number>(props.time * 1000);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  const toggle = () => {
    if (!isActive) {
      setEndTime(new Date().getTime() + msRemaining);
    }
    setIsActive(!isActive);
  };

  function reset() {
    setMsRemaining(props.time * 1000);
    setEndTime(null);
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
        setMsRemaining((msRemaining) => endTime - new Date().getTime());
      }, 100);
      if (msRemaining <= 0) {
        props.onTimerEnd();
        setIsActive(false);
        setIsEnded(true);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, msRemaining]);

  if (isEnded) {
    return (
      <View style={styles.emptyContainer} onPress={toggle}>
        <Text style={styles.intVal}>{props.time}</Text>
      </View>
    );
  } else {
    const secondsRemaining = (msRemaining / 1000).toFixed(1);
    const [intVal, decimalVal] = secondsRemaining.split(".");
    return (
      <TouchableOpacity style={styles.timerContainer} onPress={toggle}>
        <Text style={styles.intVal}>{intVal}</Text>
        <Text style={styles.point}>.</Text>
        <Text style={styles.decimalVal}>{decimalVal}</Text>
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
  intVal: { fontSize: 50, fontWeight: "bold" },
  decimalVal: { fontSize: 30 },
  point: {},
});
