import { PushUpsValue } from "@Components/PushUps/constants";
import { ProgressInfo } from "@shared/types";
import { useState } from "react";
import {
  DeyMapperToString,
  StepMapperToString,
  WeekMapperToString,
} from "@shared/constants";
import { useSound } from "use-sound";
// @ts-ignore
import audio from "../../../public/sounds/timer.mp3";
import { PressValue } from "@Components/Press/constants";
import { SquatsValue } from "@Components/Squats/constants";

export const useExercisePage = ({
  matrix,
  info,
}: {
  matrix: typeof PushUpsValue | typeof PressValue | typeof SquatsValue;
  info: ProgressInfo;
}) => {
  const [index, setIndex] = useState(0);
  const [onSuccess, setOnSuccess] = useState(false);

  const week = matrix[WeekMapperToString[info.week]];
  const dey = week[DeyMapperToString[info.day]];
  const step = dey[StepMapperToString[info.step]];

  const [play] = useSound(audio);

  const addIndex = () => {
    if (onSuccess) {
      setOnSuccess(false);
    }
    setIndex(index + 1);
  };

  const removeIndex = () => {
    if (onSuccess) {
      setOnSuccess(false);
    }
    setIndex(index - 1);
  };

  const onFinish = () => {
    play();
    addIndex();
    setOnSuccess(false);
  };

  return {
    index,
    onSuccess,
    setOnSuccess,
    onFinish,
    removeIndex,
    addIndex,
    step,
    week,
    dey,
  };
};
