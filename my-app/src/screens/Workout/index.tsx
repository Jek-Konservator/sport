import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { EXERCISE_ORDER, EXERCISE_TITLE } from "@entities/Training/config/constants";
import { isExercise } from "@entities/Training/lib/utils";
import { Workout } from "./ui";

interface WorkoutPageProps {
  exercise: string;
}

export const getWorkoutStaticParams = () => EXERCISE_ORDER.map((exercise) => ({ exercise }));

export const getWorkoutMetadata = (exercise: string): Metadata => ({
  title: isExercise(exercise) ? EXERCISE_TITLE[exercise] : "Тренировка",
});

const WorkoutPage = ({ exercise }: WorkoutPageProps) => {
  if (!isExercise(exercise)) {
    notFound();
  }

  return <Workout exercise={exercise} />;
};

export default WorkoutPage;
