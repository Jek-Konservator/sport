import { FC, useEffect, useState } from "react";
import React from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";

interface TimerProps {
  value: number;
  onFinish: () => void;
}

export const Timer: FC<TimerProps> = ({ value, onFinish }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [index, setIndex] = useState(1);

  const getDeadline = (value: number) => {
    const minutes = Math.floor(value / 60);
    const seconds = minutes > 0 ? value - minutes * 60 : value;

    if (value === 0) {
      onFinish();
    }

    setIndex(index + 1);
    setMinutes(minutes);
    setSeconds(seconds);
  };

  useEffect(() => {
    const interval = setInterval(() => getDeadline(value - index), 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <Box
      style={{ fontSize: "40px", margin: "40px", height: "70px" }}
    >{`${minutes <= 9 ? "0" + String(minutes) : String(minutes)}:${seconds <= 9 ? "0" + String(seconds) : String(seconds)}`}</Box>
  );
};
