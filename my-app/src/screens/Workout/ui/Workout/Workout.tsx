"use client";

import React, { useEffect } from "react";
import type { FC } from "react";
import { useUnit } from "effector-react";
import { Card } from "@ui/Card";
import { Center } from "@ui/Center";
import { Loader } from "@ui/Loader";
import { Stack } from "@ui/Stack";
import { Title } from "@ui/Title";
import { EXERCISE_TITLE } from "@entities/Training/config/constants";
import { ProgressStore } from "@entities/Training/model/store";
import { ExerciseIcon, ExerciseProgress } from "@entities/Training/ui";
import type { Exercise } from "@entities/Training/model/types";
import { WorkoutStore } from "../../model/store";
import { RepsCounter } from "../RepsCounter";
import { RestTimer } from "../RestTimer";
import { SetTracker } from "../SetTracker";
import { WorkoutControls } from "../WorkoutControls";
import styles from "./styles.module.scss";

interface WorkoutProps {
  exercise: Exercise;
}

export const Workout: FC<WorkoutProps> = ({ exercise }) => {
  const { session, setIndex, isResting, isLastSet, isReady, pageOpenedEv, pageClosedEv } = useUnit({
    session: WorkoutStore.store.$session,
    setIndex: WorkoutStore.store.$setIndex,
    isResting: WorkoutStore.store.$isResting,
    isLastSet: WorkoutStore.store.$isLastSet,
    isReady: ProgressStore.store.$isReady,
    pageOpenedEv: WorkoutStore.event.pageOpenedEv,
    pageClosedEv: WorkoutStore.event.pageClosedEv,
  });

  useEffect(() => {
    pageOpenedEv(exercise);

    return () => {
      pageClosedEv();
    };
  }, [exercise, pageOpenedEv, pageClosedEv]);

  if (!isReady || session?.exercise !== exercise) {
    return (
      <Center h={360}>
        <Loader type="dots" />
      </Center>
    );
  }

  return (
    <Stack align="center" gap="xl">
      <Stack align="center" gap="xs">
        <ExerciseIcon exercise={exercise} size={56} />
        <Title order={1} ta="center">
          {EXERCISE_TITLE[exercise]}
        </Title>
        <ExerciseProgress progress={session.progress} />
      </Stack>
      <SetTracker current={setIndex} sets={session.sets} />
      <Card className={styles.stage} padding="xl" withBorder>
        {isResting ? (
          <RestTimer />
        ) : (
          <RepsCounter
            isLast={isLastSet}
            reps={session.sets[setIndex] ?? 0}
            setNumber={setIndex + 1}
            total={session.sets.length}
          />
        )}
      </Card>
      <WorkoutControls exercise={exercise} />
    </Stack>
  );
};
