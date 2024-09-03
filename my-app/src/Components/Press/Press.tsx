import React from "react";
import { PressValue } from "./constants";
import { ProgressInfo } from "@shared/types";
import { PushUpsContainer, PushUpsMain, PushUpsText } from "./styled";
import { StepsButtons, SuccessButton, Timer } from "@shared/components";
import { useExercisePage } from "@shared/hooks";

const info: ProgressInfo = {
  week: 1,
  day: 1,
  step: 2,
};

export const Press = () => {
  const {
    onSuccess,
    setOnSuccess,
    step,
    index,
    removeIndex,
    addIndex,
    onFinish,
    dey,
  } = useExercisePage({ matrix: PressValue, info });

  return (
    <PushUpsContainer>
      <PushUpsMain>
        <span style={{ fontSize: "50px", marginBottom: "20px" }}>Пресс</span>
        <PushUpsText>{step[index]}</PushUpsText>
        {!onSuccess && (
          <SuccessButton
            setOnSuccess={setOnSuccess}
            index={index}
            stepLength={step.length}
            path="/squats"
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
