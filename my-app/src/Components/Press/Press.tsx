import React from "react";
import { PressValue } from "./constants";
import { PushUpsContainer, PushUpsMain, PushUpsText } from "./styled";
import { StepsButtons, SuccessButton, Timer } from "@shared/components";
import { useExercisePage } from "@shared/hooks";
import { getInfoStorage, setInfoStorageFunc } from "@shared/utils";

export const Press = () => {
  const { press: info } = getInfoStorage();

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
        <span style={{ fontSize: "30px", marginBottom: "20px" }}>
          ({info.week} неделя, {info.day} день, {info.step} уровень)
        </span>
        <PushUpsText>{`${index === step.length - 1 ? "Не меньше " : ""}${step[index]}`}</PushUpsText>
        <span style={{ fontSize: "30px", marginBottom: "20px" }}>
          {index + 1}-й подход
        </span>
        {!onSuccess && (
          <SuccessButton
            setOnSuccess={setOnSuccess}
            index={index}
            stepLength={step.length}
            path="/squats"
            setInfoStorageFunc={() =>
              setInfoStorageFunc({ info, name: "press" })
            }
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
