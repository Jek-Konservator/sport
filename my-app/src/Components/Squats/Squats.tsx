import React from "react";
import { SquatsValue } from "./constants";
import { ProgressInfo } from "@shared/types";
import { PushUpsContainer, PushUpsMain, PushUpsText } from "./styled";
import { StepsButtons, SuccessButton, Timer } from "@shared/components";
import { useExercisePage } from "@shared/hooks";

const info: ProgressInfo = {
  week: 1,
  day: 1,
  step: 2,
};

export const Squats = () => {
  const {
    onSuccess,
    setOnSuccess,
    step,
    index,
    removeIndex,
    addIndex,
    onFinish,
    dey,
  } = useExercisePage({ matrix: SquatsValue, info });

  return (
    <PushUpsContainer>
      <PushUpsMain>
        <span style={{ fontSize: "50px", marginBottom: "20px" }}>
          Приседания
        </span>
        <PushUpsText>{`${index === step.length - 1 ? "Не меньше " : ""}${step[index]}`}</PushUpsText>
        {!onSuccess && (
          <SuccessButton
            setOnSuccess={setOnSuccess}
            index={index}
            stepLength={step.length}
            path="/dayEnd"
          />
        )}
        {onSuccess && <Timer onFinish={onFinish} value={dey.restTime} />}
        <StepsButtons
          stepLength={step.length}
          index={index}
          removeIndex={removeIndex}
          addIndex={addIndex}
        />
      </PushUpsMain>
    </PushUpsContainer>
  );
};
