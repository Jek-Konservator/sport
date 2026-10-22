"use client";

import React from "react";
import type { FC } from "react";
import { IconPlayerSkipForward } from "@tabler/icons-react";
import { useUnit } from "effector-react";
import { Button } from "@ui/Button";
import { RingProgress } from "@ui/RingProgress";
import { Stack } from "@ui/Stack";
import { Text } from "@ui/Text";
import { formatTime } from "../../lib/utils";
import { WorkoutStore } from "../../model/store";
import { REST_TIMER_TEXT } from "./config";
import styles from "./styles.module.scss";

export const RestTimer: FC = () => {
  const { restLeft, restTotal, restSkippedEv } = useUnit({
    restLeft: WorkoutStore.store.$restLeft,
    restTotal: WorkoutStore.store.$restTotal,
    restSkippedEv: WorkoutStore.event.restSkippedEv,
  });

  const percent = restTotal > 0 ? (restLeft / restTotal) * 100 : 0;

  return (
    <Stack align="center" gap="sm">
      <Text c="dimmed" fw={700} size="sm" tt="uppercase">
        {REST_TIMER_TEXT.title}
      </Text>
      <RingProgress
        label={
          <Text className={styles.time} component="output" ta="center">
            {formatTime(restLeft)}
          </Text>
        }
        rootColor="var(--mantine-color-default-border)"
        roundCaps
        sections={[{ value: percent, color: "orange" }]}
        size={200}
        thickness={12}
      />
      <Text c="dimmed" size="sm" ta="center">
        {REST_TIMER_TEXT.hint}
      </Text>
      <Button
        leftSection={<IconPlayerSkipForward size={16} />}
        onClick={() => restSkippedEv()}
        variant="subtle"
      >
        {REST_TIMER_TEXT.skip}
      </Button>
    </Stack>
  );
};
