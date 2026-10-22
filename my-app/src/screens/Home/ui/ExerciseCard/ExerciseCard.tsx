import React from "react";
import Link from "next/link";
import type { FC } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { Button } from "@ui/Button";
import { Card } from "@ui/Card";
import { Group } from "@ui/Group";
import { Stack } from "@ui/Stack";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import { ROUTES } from "@shared/constants";
import { EXERCISE_TITLE } from "@entities/Training/config/constants";
import { getWorkoutDay } from "@entities/Training/lib/utils";
import { ExerciseIcon, ExerciseProgress } from "@entities/Training/ui";
import type { Exercise, Progress } from "@entities/Training/model/types";
import { getWorkoutSummary } from "../../lib/utils";
import { EXERCISE_CARD_TEXT } from "./config";
import styles from "./styles.module.scss";

interface ExerciseCardProps {
  exercise: Exercise;
  progress: Progress;
  order: number;
  isLoading?: boolean;
}

export const ExerciseCard: FC<ExerciseCardProps> = ({
  exercise,
  isLoading = false,
  order,
  progress,
}) => {
  const summary = getWorkoutSummary(getWorkoutDay(exercise, progress));

  return (
    <Card className={styles.root} padding="lg" withBorder>
      <Stack gap="md" h="100%">
        <Group justify="space-between">
          <ExerciseIcon exercise={exercise} />
          <Text c="dimmed" className={styles.order} fw={800}>
            {String(order).padStart(2, "0")}
          </Text>
        </Group>
        <Stack gap={6}>
          <Title order={3}>{EXERCISE_TITLE[exercise]}</Title>
          <ExerciseProgress progress={progress} />
        </Stack>
        <Text c="dimmed" size="sm">
          {[
            EXERCISE_CARD_TEXT.sets(summary.sets),
            EXERCISE_CARD_TEXT.totalReps(summary.totalReps),
            EXERCISE_CARD_TEXT.rest(summary.restTime),
          ].join(" · ")}
        </Text>
        <Button
          className={styles.action}
          component={Link}
          disabled={isLoading}
          fullWidth
          href={ROUTES.workout(exercise)}
          rightSection={<IconChevronRight size={16} />}
          variant="light"
        >
          {EXERCISE_CARD_TEXT.start}
        </Button>
      </Stack>
    </Card>
  );
};
