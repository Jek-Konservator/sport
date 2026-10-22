import { createQuery } from "@farfetched/core";
import { createEvent, sample } from "effector";
import { notify } from "@ui/NotificationSystem";
import { getErrorMessage } from "@shared/utils/errors";
import { TrainingApi } from "@entities/Training/api";
import { ProgressStore } from "@entities/Training/model/store";
import { SETTINGS_NOTIFICATION } from "../../../config/notification";
import type { ProgressSubmitPayload } from "../../types";

const progressSubmittedEv = createEvent<ProgressSubmitPayload>();

const saveProgressQuery = createQuery({
  handler: TrainingApi.saveProgress,
});

sample({
  clock: progressSubmittedEv,
  source: ProgressStore.store.$progress,
  fn: (progressMap, { exercise, progress }) => ({
    progress: { ...progressMap, [exercise]: progress },
  }),
  target: saveProgressQuery.start,
});

// Успех: обновляем общий прогресс и показываем уведомление
sample({
  clock: saveProgressQuery.finished.success,
  fn: ({ result }) => {
    notify.show(SETTINGS_NOTIFICATION.save.success);

    return result;
  },
  target: ProgressStore.event.progressUpdatedEv,
});

sample({
  clock: saveProgressQuery.finished.failure,
  fn: ({ error }) => {
    notify.show({
      ...SETTINGS_NOTIFICATION.save.failure,
      message: getErrorMessage(error, SETTINGS_NOTIFICATION.save.failure.message),
    });
  },
});

export const SettingsStore = {
  event: { progressSubmittedEv },
  query: { saveProgressQuery },
};
