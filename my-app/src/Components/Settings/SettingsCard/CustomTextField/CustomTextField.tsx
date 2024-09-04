import { FC, useState } from "react";
import React from "react";
import { InfoContainerTextField } from "../styled";
import { ProgressInfo } from "@shared/types";

interface WeekTextFieldProps {
  name: "week" | "day" | "step";
  defaultValue: number;
  maxValue: number;
  setNewInfo: ({}: {
    name: "week" | "day" | "step";
    newValue: ProgressInfo["day"] | ProgressInfo["week"] | ProgressInfo["step"];
  }) => void;
}

export const CustomTextField: FC<WeekTextFieldProps> = ({
  defaultValue,
  maxValue,
  setNewInfo,
  name,
}) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <InfoContainerTextField
      value={value}
      type="number"
      inputProps={{ style: { padding: "3px" } }}
      onChange={(e) => {
        var value = parseInt(e.target.value, 10);

        if (value > maxValue) value = 6;
        if (value < 0) value = 0;
        setNewInfo({
          name,
          newValue: value as
            | ProgressInfo["day"]
            | ProgressInfo["week"]
            | ProgressInfo["step"],
        });
        setValue(value);
      }}
    ></InfoContainerTextField>
  );
};
