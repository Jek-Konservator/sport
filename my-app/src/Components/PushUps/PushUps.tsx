import React from "react";
import { PushUpsValue } from "./constants";
import { ProgressInfo } from "@shared/types";
import { PushUpsContainer, PushUpsMain, PushUpsText } from "./styled";
import { SuccessButton, Timer } from "@shared/components";
import { StepsButtons } from "@shared/components/StepsButtons";
import { useExercisePage } from "@shared/hooks";

export const PushUps = () => {
  const info: ProgressInfo = {
    week: 1,
    day: 1,
    step: 2,
  };

  const {
    onSuccess,
    setOnSuccess,
    step,
    index,
    removeIndex,
    addIndex,
    onFinish,
    dey,
  } = useExercisePage({ matrix: PushUpsValue, info });

  return (
    <PushUpsContainer>
      <PushUpsMain>
        <span style={{ fontSize: "50px", marginBottom: "20px" }}>
          Отжимания
        </span>
        <PushUpsText>{step[index]}</PushUpsText>
        {!onSuccess && (
          <SuccessButton
            setOnSuccess={setOnSuccess}
            index={index}
            stepLength={step.length}
            path="/press"
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
