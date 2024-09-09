import React from "react";
import { getInfoStorage } from "@shared/utils";
import { SettingsContainer } from "./styled";
import { SettingsCard } from "@Components/Settings/SettingsCard";

export const Settings = () => {
  const { press, squats, pushUps } = getInfoStorage();

  return (
    <SettingsContainer>
      <SettingsCard name="pushUps" info={pushUps} />
      <SettingsCard name="press" info={press} />
      <SettingsCard name="squats" info={squats} />
    </SettingsContainer>
  );
};
