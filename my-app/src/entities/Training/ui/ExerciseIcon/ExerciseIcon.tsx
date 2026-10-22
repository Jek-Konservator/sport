import React from "react";
import type { FC } from "react";
import { IconGymnastics, IconStretching, IconYoga } from "@tabler/icons-react";
import { ThemeIcon } from "@ui/ThemeIcon";
import type { Icon } from "@tabler/icons-react";
import type { ThemeIconProps } from "@ui/ThemeIcon";
import { Exercise } from "../../model/types";

const EXERCISE_ICON: Record<Exercise, Icon> = {
  [Exercise.PushUps]: IconGymnastics,
  [Exercise.Press]: IconYoga,
  [Exercise.Squats]: IconStretching,
};

interface ExerciseIconProps {
  exercise: Exercise;
  size?: ThemeIconProps["size"];
}

export const ExerciseIcon: FC<ExerciseIconProps> = ({ exercise, size = "xl" }) => {
  const Icon = EXERCISE_ICON[exercise];

  return (
    <ThemeIcon radius="xl" size={size} variant="gradient">
      <Icon size="65%" stroke={1.6} />
    </ThemeIcon>
  );
};
