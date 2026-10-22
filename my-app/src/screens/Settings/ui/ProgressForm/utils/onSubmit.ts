import { isDay, isLevel, isWeek } from "@entities/Training/lib/utils";
import type { Exercise, Progress } from "@entities/Training/model/types";
import type { ProgressFormSchema } from "../../../model/form";
import type { ProgressSubmitPayload } from "../../../model/types";

export const transformFormToProgress = ({
  week,
  day,
  level,
}: ProgressFormSchema): Progress | null => {
  if (!isWeek(week) || !isDay(day) || !isLevel(level)) {
    return null;
  }

  return { week, day, level };
};

export const createOnSubmit =
  (exercise: Exercise, submit: (payload: ProgressSubmitPayload) => void) =>
  (values: ProgressFormSchema) => {
    const progress = transformFormToProgress(values);

    if (progress) {
      submit({ exercise, progress });
    }
  };
