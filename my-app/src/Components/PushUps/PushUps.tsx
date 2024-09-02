import React, { useState } from "react";
import { PushUpsValue } from "./constants";
import {
  DeyMapperToString,
  StepMapperToString,
  WeekMapperToString,
} from "@shared/constants";
import {
  DayNumberValues,
  StepNumberValues,
  WeekNumberValues,
} from "@shared/types";
import { PushUpsContainer, PushUpsMain, PushUpsText } from "./styled";
import { Box, Button, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Timer } from "@shared/components";
// @ts-ignore
import audio from "../../../public/sounds/timer.mp3";

import { useSound } from "use-sound";

export const PushUps = () => {
  const info: {
    week: WeekNumberValues;
    day: DayNumberValues;
    step: StepNumberValues;
  } = {
    week: 1,
    day: 1,
    step: 2,
  };
  const [index, setIndex] = useState(0);
  const [onSuccess, setOnSuccess] = useState(false);

  const week = PushUpsValue[WeekMapperToString[info.week]];
  const dey = week[DeyMapperToString[info.day]];
  const step = dey[StepMapperToString[info.step]];

  const [play] = useSound(audio);

  const addIndex = () => {
    setIndex(index + 1);
  };

  const removeIndex = () => {
    setIndex(index - 1);
  };

  const onFinish = () => {
    play();
    addIndex();
    setOnSuccess(false);
  };

  return (
    <PushUpsContainer>
      <PushUpsMain>
        <span style={{ fontSize: "50px", marginBottom: "20px" }}>
          Отжимания
        </span>
        <PushUpsText>{step[index]}</PushUpsText>

        {!onSuccess && (
          <IconButton
            onClick={() => setOnSuccess(true)}
            style={{ margin: "40px" }}
            color="success"
          >
            <CheckCircleIcon style={{ width: "70px", height: "70px" }} />
          </IconButton>
        )}

        {onSuccess && <Timer onFinish={onFinish} value={dey.restTime} />}

        <Box>
          <Button
            style={{ marginRight: "10px" }}
            disabled={index === 0}
            variant={"contained"}
            onClick={removeIndex}
          >
            Предыдущий
          </Button>
          <Button
            variant={"contained"}
            onClick={addIndex}
            disabled={index === step.length - 1}
          >
            Следующий
          </Button>
        </Box>
      </PushUpsMain>
    </PushUpsContainer>
  );
};
