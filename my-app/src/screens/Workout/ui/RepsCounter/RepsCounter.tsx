import React from "react";
import type { FC } from "react";
import { Stack } from "@ui/Stack";
import { Text } from "@ui/Text";
import { REPS_COUNTER_TEXT } from "./config";
import styles from "./styles.module.scss";

interface RepsCounterProps {
  reps: number;
  setNumber: number;
  total: number;
  isLast: boolean;
}

export const RepsCounter: FC<RepsCounterProps> = ({ isLast, reps, setNumber, total }) => {
  return (
    <Stack align="center" gap={4}>
      <Text c="dimmed" fw={700} size="sm" tt="uppercase">
        {REPS_COUNTER_TEXT.set(setNumber, total)}
      </Text>
      {isLast ? (
        <Text c="pink" fw={700}>
          {REPS_COUNTER_TEXT.atLeast}
        </Text>
      ) : null}
      <Text className={styles.reps} component="output">
        {reps}
      </Text>
      <Text c="dimmed" size="lg">
        {REPS_COUNTER_TEXT.reps(reps)}
      </Text>
      {isLast ? (
        <Text c="dimmed" mt="sm" size="sm" ta="center">
          {REPS_COUNTER_TEXT.lastSetHint}
        </Text>
      ) : null}
    </Stack>
  );
};
