import React from "react";
import type { FC } from "react";
import { Badge } from "@ui/Badge";
import { Group } from "@ui/Group";
import type { Progress } from "../../model/types";

interface ExerciseProgressProps {
  progress: Progress;
}

export const ExerciseProgress: FC<ExerciseProgressProps> = ({ progress }) => {
  return (
    <Group gap={6}>
      <Badge color="orange" variant="light">
        Неделя {progress.week}
      </Badge>
      <Badge color="pink" variant="light">
        День {progress.day}
      </Badge>
      <Badge color="grape" variant="light">
        Уровень {progress.level}
      </Badge>
    </Group>
  );
};
