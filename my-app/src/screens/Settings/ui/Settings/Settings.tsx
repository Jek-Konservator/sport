"use client";

import React from "react";
import { useUnit } from "effector-react";
import { Center } from "@ui/Center";
import { Loader } from "@ui/Loader";
import { SimpleGrid } from "@ui/SimpleGrid";
import { Stack } from "@ui/Stack";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import { EXERCISE_ORDER } from "@entities/Training/config/constants";
import { ProgressStore } from "@entities/Training/model/store";
import { ProgressForm } from "../ProgressForm";
import { SETTINGS_TEXT } from "./config";

export const Settings = () => {
  const { progress, isReady } = useUnit({
    progress: ProgressStore.store.$progress,
    isReady: ProgressStore.store.$isReady,
  });

  return (
    <Stack gap="xl">
      <Stack gap={4}>
        <Title order={1}>{SETTINGS_TEXT.title}</Title>
        <Text c="dimmed">{SETTINGS_TEXT.description}</Text>
      </Stack>
      {isReady ? (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {EXERCISE_ORDER.map((exercise) => (
            <ProgressForm exercise={exercise} key={exercise} progress={progress[exercise]} />
          ))}
        </SimpleGrid>
      ) : (
        <Center h={200}>
          <Loader type="dots" />
        </Center>
      )}
    </Stack>
  );
};
