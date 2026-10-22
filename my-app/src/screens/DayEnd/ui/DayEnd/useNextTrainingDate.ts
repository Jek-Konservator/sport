import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getNextTrainingDate } from "@entities/Training/lib/utils";
import { NEXT_TRAINING_DATE_FORMAT } from "./config";

/** Дата считается на клиенте, чтобы часовой пояс сервера не влиял на результат */
export const useNextTrainingDate = (): string | null => {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    setDate(dayjs(getNextTrainingDate(new Date())).format(NEXT_TRAINING_DATE_FORMAT));
  }, []);

  return date;
};
