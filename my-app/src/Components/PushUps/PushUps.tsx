import React from "react";
import { PushUpsValue } from "./constants";
import { ProgressInfo } from "@shared/types";
import { PushUpsContainer, PushUpsMain, PushUpsText } from "./styled";
import { SuccessButton, Timer } from "@shared/components";
import { StepsButtons } from "@shared/components/StepsButtons";
import { useExercisePage } from "@shared/hooks";
import { getInfoStorage, setInfoStorageFunc } from "@shared/utils";
import { InfoStorage } from "@shared/constants";

export const PushUps = () => {
  const info = getInfoStorage()?.pushUps || InfoStorage.pushUps;

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
              setInfoStorageFunc({ info, name: "pushUps" })
            }
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
