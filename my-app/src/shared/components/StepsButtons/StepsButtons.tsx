import type { FC } from "react";
import React from "react";
import { Box, Button } from "@mui/material";
import { visit } from "yaml";

interface StepsButtonsProps {
  index: number;
  stepLength: number;
  removeIndex: () => void;
  addIndex: () => void;
}

export const StepsButtons: FC<StepsButtonsProps> = ({
  index,
  removeIndex,
  addIndex,
  stepLength,
}) => {
  return (
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
        disabled={index === stepLength - 1}
      >
        Следующий
      </Button>
    </Box>
  );
};
