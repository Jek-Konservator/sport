"use client";

import React from "react";
import Link from "next/link";
import { IconCalendar, IconConfetti, IconHome } from "@tabler/icons-react";
import { Button } from "@ui/Button";
import { Card } from "@ui/Card";
import { Group } from "@ui/Group";
import { Stack } from "@ui/Stack";
import { Text } from "@ui/Text";
import { ThemeIcon } from "@ui/ThemeIcon";
import { Title } from "@ui/Title";
import { ROUTES } from "@shared/constants";
import { DAY_END_TEXT } from "./config";
import styles from "./styles.module.scss";
import { useNextTrainingDate } from "./useNextTrainingDate";

export const DayEnd = () => {
  const nextTrainingDate = useNextTrainingDate();

  return (
    <Stack align="center" className={styles.root} gap="xl">
      <ThemeIcon className={styles.icon} radius="50%" size={96} variant="gradient">
        <IconConfetti size={52} stroke={1.5} />
      </ThemeIcon>
      <Stack align="center" gap="xs">
        <Title order={1} ta="center">
          {DAY_END_TEXT.title}
        </Title>
        <Text c="dimmed" size="lg" ta="center">
          {DAY_END_TEXT.subtitle}
        </Text>
      </Stack>
      <Card padding="lg" withBorder>
        <Group gap="md" wrap="nowrap">
          <ThemeIcon color="orange" radius="md" size="xl" variant="light">
            <IconCalendar size={24} />
          </ThemeIcon>
          <div>
            <Text c="dimmed" size="sm">
              {DAY_END_TEXT.nextTraining}
            </Text>
            <Text className={styles.date} fw={800} size="xl">
              {nextTrainingDate ?? "…"}
            </Text>
          </div>
        </Group>
      </Card>
      <Button
        component={Link}
        href={ROUTES.home}
        leftSection={<IconHome size={18} />}
        variant="default"
      >
        {DAY_END_TEXT.home}
      </Button>
    </Stack>
  );
};
