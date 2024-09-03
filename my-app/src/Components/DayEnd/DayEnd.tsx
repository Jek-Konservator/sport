import React from "react";
import { DayEndContainer } from "./styled";
import dayjs from "dayjs";

export const DayEnd = () => {
  const getNextDay = () => {
    const date = dayjs().add(2, "day");
    let number = dayjs(date).format("dddd");
    let num = dayjs(date).format("D");

    if (number.charAt(0).toUpperCase() + number.slice(1) === "Вторник") {
      number = date.add(1, "day").format("dddd");
      num = date.add(1, "day").format("D");
    }

    if (number.charAt(0).toUpperCase() + number.slice(1) === "Четверг") {
      number = date.add(1, "day").format("dddd");
      num = date.add(1, "day").format("D");
    }

    if (number.charAt(0).toUpperCase() + number.slice(1) === "Суббота") {
      number = date.add(2, "day").format("dddd");
      num = date.add(2, "day").format("D");
    }

    if (number.charAt(0).toUpperCase() + number.slice(1) === "Воскресенье") {
      number = date.add(1, "day").format("dddd");
      num = date.add(1, "day").format("D");
    }

    return {
      text: number.charAt(0).toUpperCase() + number.slice(1),
      number: num,
    };
  };

  const date = getNextDay();

  return (
    <DayEndContainer>
      <span style={{ fontSize: 40 }}>На сегодня всё</span>
      <span style={{ fontSize: 35 }}>
        Увидимся в {date.text} {date.number} числа
      </span>
    </DayEndContainer>
  );
};
