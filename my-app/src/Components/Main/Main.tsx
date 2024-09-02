import React from "react";
import { MainContainer } from "./styled";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export const Main = () => {
  const { replace } = useRouter();

  return (
    <MainContainer>
      <Button onClick={() => replace("/pushUps")} variant="contained">
        Отжимания
      </Button>
      <Button
        onClick={() => replace("/press")}
        style={{ margin: "0 10px" }}
        variant="contained"
      >
        Пресс
      </Button>
      <Button onClick={() => replace("/squats")} variant="contained">
        Приседания
      </Button>
    </MainContainer>
  );
};
