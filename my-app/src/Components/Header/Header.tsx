import React from "react";
import { HeaderContainer } from "@Components/Header/styled";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export const Header = () => {
  const { replace } = useRouter();

  return (
    <HeaderContainer>
      <Button onClick={() => replace("/")} style={{ color: "white" }}>
        Главная
      </Button>
    </HeaderContainer>
  );
};
