"use client";

import React from "react";
import Link from "next/link";
import { IconPlayerPlay } from "@tabler/icons-react";
import { useUnit } from "effector-react";
import { Button } from "@ui/Button";
import { SimpleGrid } from "@ui/SimpleGrid";
import { Stack } from "@ui/Stack";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import { ROUTES } from "@shared/constants";
import { EXERCISE_ORDER } from "@entities/Training/config/constants";
import { ProgressStore } from "@entities/Training/model/store";
import { ExerciseCard } from "../ExerciseCard";
import { HOME_TEXT } from "./config";
import styles from "./styles.module.scss";

export const Home = () => {
  const { progress, isReady } = useUnit({
    progress: ProgressStore.store.$progress,
    isReady: ProgressStore.store.$isReady,
  });

  const [firstExercise] = EXERCISE_ORDER;

  return (
    <Stack gap="xl">
      <Stack className={styles.hero} gap="sm">
        <Text c="orange" fw={700} size="sm" tt="uppercase">
          {HOME_TEXT.eyebrow}
        </Text>
        <Title className={styles.title} order={1}>
          {HOME_TEXT.title}
        </Title>
        <Text c="dimmed" maw={520} size="lg">
          {HOME_TEXT.description}
        </Text>
        {firstExercise ? (
          <Button
            className={styles.start}
            component={Link}
            href={ROUTES.workout(firstExercise)}
            leftSection={<IconPlayerPlay size={18} />}
            size="lg"
            variant="gradient"
          >
            {HOME_TEXT.start}
          </Button>
        ) : null}
      </Stack>
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        {EXERCISE_ORDER.map((exercise, index) => (
          <ExerciseCard
            exercise={exercise}
            isLoading={!isReady}
            key={exercise}
            order={index + 1}
            progress={progress[exercise]}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
};
