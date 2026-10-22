import { Exercise } from "../../../model/types";
import { PRESS_PROGRAM } from "./press";
import { PUSH_UPS_PROGRAM } from "./push-ups";
import { SQUATS_PROGRAM } from "./squats";
import type { Program } from "../../../model/types";

export const PROGRAM: Record<Exercise, Program> = {
  [Exercise.PushUps]: PUSH_UPS_PROGRAM,
  [Exercise.Press]: PRESS_PROGRAM,
  [Exercise.Squats]: SQUATS_PROGRAM,
};
