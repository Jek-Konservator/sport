import { createQuery } from "@farfetched/core";
import { createEvent, createStore, sample } from "effector";
import { TrainingApi } from "../../../api";
import { PROGRESS_MAP_DEFAULT } from "../../../config/constants";
import type { ProgressMap } from "../../types";

const progressRequestedEv = createEvent();
const progressUpdatedEv = createEvent<ProgressMap>();

const getProgressQuery = createQuery({
  handler: TrainingApi.getProgress,
});

const $progress = createStore<ProgressMap>(PROGRESS_MAP_DEFAULT);

// Прогресс загружен хотя бы раз (успешно или нет) — можно показывать экраны
const $isReady = createStore(false);

sample({
  clock: progressRequestedEv,
  target: getProgressQuery.start,
});

sample({
  clock: getProgressQuery.finished.success,
  fn: ({ result }) => result,
  target: $progress,
});

sample({
  clock: progressUpdatedEv,
  target: $progress,
});

sample({
  clock: getProgressQuery.finished.finally,
  fn: () => true,
  target: $isReady,
});

export const ProgressStore = {
  event: { progressRequestedEv, progressUpdatedEv },
  store: { $progress, $isReady },
  query: { getProgressQuery },
};
