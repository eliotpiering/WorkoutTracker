import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

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

  function toggle() {
    setIsActive(!isActive);
  }

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

  return (
    <View>
      {!isEnded && (
        <Button title={isActive ? "Pause" : "Start"} onPress={toggle} />
      )}
      <Text style={styles.timer}>{seconds}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timer: {
    fontSize: 50,
    fontWeight: "bold",
  },
});
