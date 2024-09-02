import { StepNumberValues, StepStringValues } from "@shared/types";

export const StepMapperToNumber: Record<StepStringValues, StepNumberValues> = {
  oneStep: 1,
  twoStep: 2,
  threeStep: 3,
};

export const StepMapperToString: Record<StepNumberValues, StepStringValues> = {
  1: "oneStep",
  2: "twoStep",
  3: "threeStep",
};
