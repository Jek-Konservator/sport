import React from "react";
import type { Metadata } from "next";
import WorkoutPage, { getWorkoutMetadata, getWorkoutStaticParams } from "@screens/Workout";

interface PageProps {
  params: Promise<{ exercise: string }>;
}

export const dynamicParams = false;

export const generateStaticParams = getWorkoutStaticParams;

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { exercise } = await params;

  return getWorkoutMetadata(exercise);
};

const Page = async ({ params }: PageProps) => {
  const { exercise } = await params;

  return <WorkoutPage exercise={exercise} />;
};

export default Page;
