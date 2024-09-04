import React from "react";
import { SquatsValue } from "./constants";
import { InfoStorageType, ProgressInfo } from "@shared/types";
import { PushUpsContainer, PushUpsMain, PushUpsText } from "./styled";
import { StepsButtons, SuccessButton, Timer } from "@shared/components";
import { useExercisePage } from "@shared/hooks";
import { getInfoStorage, setInfoStorageFunc } from "@shared/utils";
import { InfoStorage } from "@shared/constants";

export const Squats = () => {
  const info = getInfoStorage()?.squats || InfoStorage.squats;

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
        <span style={{ fontSize: "30px", marginBottom: "20px" }}>
          ({info.week} неделя, {info.day} день, {info.step} уровень)
        </span>
        <PushUpsText>{`${index === step.length - 1 ? "Не меньше " : ""}${step[index]}`}</PushUpsText>{" "}
        <span style={{ fontSize: "30px", marginBottom: "20px" }}>
          {index + 1}-й подход
        </span>
        {!onSuccess && (
          <SuccessButton
            setInfoStorageFunc={() =>
              setInfoStorageFunc({ info, name: "squats" })
            }
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
