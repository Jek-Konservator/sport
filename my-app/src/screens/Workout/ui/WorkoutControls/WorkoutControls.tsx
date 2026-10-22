"use client";

import React from "react";
import Link from "next/link";
import type { FC } from "react";
import { IconCheck, IconChevronLeft, IconChevronRight, IconTrophy } from "@tabler/icons-react";
import { useUnit } from "effector-react";
import { ActionIcon } from "@ui/ActionIcon";
import { Button } from "@ui/Button";
import { Group } from "@ui/Group";
import { Tooltip } from "@ui/Tooltip";
import { getNextExercise } from "@entities/Training/lib/utils";
import type { Exercise } from "@entities/Training/model/types";
import { getFinishHref } from "../../lib/utils";
import { WorkoutStore } from "../../model/store";
import { WORKOUT_CONTROLS_TEXT } from "./config";
import styles from "./styles.module.scss";

interface WorkoutControlsProps {
  exercise: Exercise;
}

export const WorkoutControls: FC<WorkoutControlsProps> = ({ exercise }) => {
  const { setIndex, isLastSet, isResting, setDoneEv, nextSetEv, prevSetEv, exerciseFinishedEv } =
    useUnit({
      setIndex: WorkoutStore.store.$setIndex,
      isLastSet: WorkoutStore.store.$isLastSet,
      isResting: WorkoutStore.store.$isResting,
      setDoneEv: WorkoutStore.event.setDoneEv,
      nextSetEv: WorkoutStore.event.nextSetEv,
      prevSetEv: WorkoutStore.event.prevSetEv,
      exerciseFinishedEv: WorkoutStore.event.exerciseFinishedEv,
    });

  const isLastExercise = getNextExercise(exercise) === null;

  return (
    <Group className={styles.root} gap="md" justify="center" wrap="nowrap">
      <Tooltip label={WORKOUT_CONTROLS_TEXT.prev}>
        <ActionIcon
          aria-label={WORKOUT_CONTROLS_TEXT.prev}
          disabled={setIndex === 0}
          onClick={() => prevSetEv()}
          radius="xl"
          size={52}
          variant="default"
        >
          <IconChevronLeft />
        </ActionIcon>
      </Tooltip>

      {isLastSet ? (
        <Button
          className={styles.main}
          component={Link}
          href={getFinishHref(exercise)}
          leftSection={<IconTrophy size={20} />}
          onClick={() => exerciseFinishedEv()}
          radius="xl"
          size="lg"
          variant="gradient"
        >
          {isLastExercise
            ? WORKOUT_CONTROLS_TEXT.finishWorkout
            : WORKOUT_CONTROLS_TEXT.finishExercise}
        </Button>
      ) : (
        <Button
          className={styles.main}
          disabled={isResting}
          leftSection={<IconCheck size={20} />}
          onClick={() => setDoneEv()}
          radius="xl"
          size="lg"
          variant="gradient"
        >
          {WORKOUT_CONTROLS_TEXT.done}
        </Button>
      )}

      <Tooltip label={WORKOUT_CONTROLS_TEXT.next}>
        <ActionIcon
          aria-label={WORKOUT_CONTROLS_TEXT.next}
          disabled={isLastSet}
          onClick={() => nextSetEv()}
          radius="xl"
          size={52}
          variant="default"
        >
          <IconChevronRight />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
