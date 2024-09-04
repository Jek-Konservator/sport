import type { FC } from "react";
import React from "react";
import { IconButton } from "@mui/material";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/router";
import { ProgressInfo } from "@shared/types";

interface SuccessButtonProps {
  stepLength: number;
  index: number;
  setOnSuccess: (value: boolean) => void;
  setInfoStorageFunc: () => void;
  path: string;
}

export const SuccessButton: FC<SuccessButtonProps> = ({
  stepLength,
  index,
  setOnSuccess,
  path,
  setInfoStorageFunc,
}) => {
  const { replace } = useRouter();

  const handleClick = () => {
    if (index === stepLength - 1) {
      setInfoStorageFunc();
      replace(path);
    } else {
      setOnSuccess(true);
    }
  };

  return (
    <IconButton
      onClick={handleClick}
      style={{ margin: "40px" }}
      color="success"
    >
      {index === stepLength - 1 ? (
        <NextPlanIcon style={{ width: "70px", height: "70px" }} />
      ) : (
        <CheckCircleIcon style={{ width: "70px", height: "70px" }} />
      )}
    </IconButton>
  );
};
