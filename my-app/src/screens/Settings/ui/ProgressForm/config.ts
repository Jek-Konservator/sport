import { PROGRESS_LIMIT } from "@entities/Training/config/constants";
import { ProgressFormNames } from "../../model/types";

export const PROGRESS_FORM_FIELDS = [
  { name: ProgressFormNames.Week, label: "Неделя", max: PROGRESS_LIMIT.week },
  { name: ProgressFormNames.Day, label: "День", max: PROGRESS_LIMIT.day },
  { name: ProgressFormNames.Level, label: "Уровень", max: PROGRESS_LIMIT.level },
] as const;

export const PROGRESS_FORM_TEXT = {
  save: "Сохранить",
};
