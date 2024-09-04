import { FC, useState } from "react";
import React from "react";
import {
  InfoContainer,
  InfoContainerButton,
  InfoContainerText,
  InfoContainerTitle,
} from "./styled";
import { CustomTextField } from "./CustomTextField";
import { InfoStorageType, ProgressInfo } from "@shared/types";
import { getInfoStorage, setInfoStorage } from "@shared/utils";

interface SettingsCardProps {
  name: "press" | "pushUps" | "squats";
  info: ProgressInfo;
}

export const SettingsCard: FC<SettingsCardProps> = ({ name, info }) => {
  const { day, step, week } = info;

  const [newInfo, setNewInfo] = useState(info);

  const getTitle = () => {
    if (name === "press") return "Пресс";
    if (name === "squats") return "Приседания";
    if (name === "pushUps") return "Отжимания";
  };

  const setNewInfoFunc = ({
    newValue,
    name,
  }: {
    name: "week" | "day" | "step";
    newValue: ProgressInfo["day"] | ProgressInfo["week"] | ProgressInfo["step"];
  }) => {
    setNewInfo({ ...newInfo, [name]: newValue });
  };

  const handleSave = () => {
    setInfoStorage({ ...getInfoStorage(), [name]: newInfo });
  };

  return (
    <InfoContainer>
      <InfoContainerTitle>{getTitle()}</InfoContainerTitle>
      <InfoContainerText>
        Неделя -
        <CustomTextField
          setNewInfo={setNewInfoFunc}
          defaultValue={week}
          maxValue={6}
          name="week"
        />
      </InfoContainerText>
      <InfoContainerText>
        День -
        <CustomTextField
          setNewInfo={setNewInfoFunc}
          defaultValue={day}
          maxValue={3}
          name="day"
        />
      </InfoContainerText>
      <InfoContainerText>
        Уровень -
        <CustomTextField
          setNewInfo={setNewInfoFunc}
          defaultValue={step}
          maxValue={3}
          name="step"
        />
      </InfoContainerText>
      <InfoContainerButton onClick={handleSave} variant="contained">
        Сохранить
      </InfoContainerButton>
    </InfoContainer>
  );
};
