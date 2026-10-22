import { number, object } from "yup";
import type { InferType } from "yup";
import { PROGRESS_LIMIT } from "@entities/Training/config/constants";
import { ProgressFormNames } from "../../types";

const progressField = (max: number) =>
  number()
    .typeError("Введите число")
    .required("Обязательное поле")
    .integer("Только целое число")
    .min(1, "Минимум 1")
    .max(max, `Максимум ${max}`);

export const progressFormSchema = object({
  [ProgressFormNames.Week]: progressField(PROGRESS_LIMIT.week),
  [ProgressFormNames.Day]: progressField(PROGRESS_LIMIT.day),
  [ProgressFormNames.Level]: progressField(PROGRESS_LIMIT.level),
});

export type ProgressFormSchema = InferType<typeof progressFormSchema>;
