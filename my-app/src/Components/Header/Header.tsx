import React from "react";
import { HeaderContainer } from "@Components/Header/styled";
import { Button, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import SettingsIcon from "@mui/icons-material/Settings";
export const Header = () => {
  const { replace } = useRouter();

  return (
    <HeaderContainer>
      <Button onClick={() => replace("/")} style={{ color: "white" }}>
        Главная
      </Button>
      <IconButton
        onClick={() => replace("/settings")}
        style={{ color: "white" }}
      >
        <SettingsIcon />
      </IconButton>
    </HeaderContainer>
  );
};
