import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Pressable } from "react-native";

import { View, Text, Button } from "./Themed";
import { AntDesign } from "@expo/vector-icons";

type NumberSelectProps = {
  step: number;
  start: number;
  min: number;
  max: number;
  // TODO what is this type
  onChange: any;
};

enum HeldDir {
  Up,
  Down,
  None,
}

export function NumberSelect(props: NumberSelectProps) {
  const [number, setNumberState] = useState<number>(props.start);
  const [held, setHeld] = useState<HeldDirection>(HeldDir.None);

  useEffect(() => {
    let interval;
    if (held !== HeldDir.None) {
      interval = setInterval(() => {
        if (held === HeldDir.Up) {
          stepUp();
        } else if (held === HeldDir.Down) {
          stepDown();
        }
      }, 200);
    }

    return () => clearInterval(interval);
  }, [held, number]);

  const setNumber = (number) => {
    if (!!props.onChange) props.onChange(number);
    setNumberState(number);
  };

  const setHeldDir = (direction: HeldDir) => {
    return () => {
      setHeld(direction);
    };
  };

  const setNotHeld = () => {
    setHeld(HeldDir.None);
  };

  const stepUp = () => {
    const next = props.max
      ? Math.min(number + props.step, props.max)
      : number + props.step;
    setNumber(next);
  };

  const stepDown = () => {
    const next = Math.max(number - props.step, props.min);
    setNumber(next);
  };
  return (
    <View style={styles.numberSelectContainer}>
      <Pressable
        style={styles.numberButton}
        onPressIn={stepDown}
        delayLongPress={200}
        onLongPress={setHeldDir(HeldDir.Down)}
        hitSlop={15}
        onPressOut={setNotHeld}
      >
        <Text>
          <AntDesign name="down" size={40} />
        </Text>
      </Pressable>
      <View style={styles.selected}>
        <Text>{number}</Text>
      </View>
      <Pressable
        style={styles.numberButton}
        onPressIn={stepUp}
        delayLongPress={200}
        onLongPress={setHeldDir(HeldDir.Up)}
        hitSlop={15}
        onPressOut={setNotHeld}
      >
        <Text>
          <AntDesign name="up" size={40} />
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  numberSelectContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  numberButton: { margin: 10 },
  selected: { margin: 10 },
});
