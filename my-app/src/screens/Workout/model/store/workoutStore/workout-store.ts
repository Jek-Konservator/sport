import { createQuery } from "@farfetched/core";
import { combine, createEffect, createEvent, createStore, sample } from "effector";
import { interval } from "patronum";
import { notify } from "@ui/NotificationSystem";
import { getErrorMessage } from "@shared/utils/errors";
import { playSound } from "@services/sound";
import { TrainingApi } from "@entities/Training/api";
import { getNextProgress } from "@entities/Training/lib/utils";
import { ProgressStore } from "@entities/Training/model/store";
import type { Exercise } from "@entities/Training/model/types";
import { TIMER_SOUND_SRC, TIMER_TICK_MS } from "../../../config/constants";
import { WORKOUT_NOTIFICATION } from "../../../config/notification";
import { createWorkoutSession } from "../../../lib/utils";
import type { WorkoutSession } from "../../types";

const pageOpenedEv = createEvent<Exercise>();
const pageClosedEv = createEvent();
const setDoneEv = createEvent();
const nextSetEv = createEvent();
const prevSetEv = createEvent();
const restSkippedEv = createEvent();
const exerciseFinishedEv = createEvent();

const restStartedEv = createEvent<number>();
const restStoppedEv = createEvent();
const restFinishedEv = createEvent();

const playSoundFx = createEffect(() => playSound(TIMER_SOUND_SRC));

const saveProgressQuery = createQuery({
  handler: TrainingApi.saveProgress,
});

const $session = createStore<WorkoutSession | null>(null).reset(pageClosedEv);
const $setIndex = createStore(0).reset(pageOpenedEv, pageClosedEv);
const $restTotal = createStore(0).reset(pageOpenedEv, pageClosedEv);
const $restLeft = createStore(0).reset(pageOpenedEv, pageClosedEv, restStoppedEv);

const $isResting = $restLeft.map((left) => left > 0);
const $isLastSet = combine(
  $session,
  $setIndex,
  (session, index) => session !== null && index >= session.sets.length - 1,
);

const { tick } = interval({
  timeout: TIMER_TICK_MS,
  start: restStartedEv,
  stop: restStoppedEv,
});

// Снимок тренировки при открытии страницы
sample({
  clock: pageOpenedEv,
  source: ProgressStore.store.$progress,
  fn: (progress, exercise) => createWorkoutSession(exercise, progress[exercise]),
  target: $session,
});

// Если прогресс загрузился уже после открытия страницы — пересобираем снимок
sample({
  clock: ProgressStore.query.getProgressQuery.finished.success,
  source: $session,
  fn: (session, { result }) =>
    session ? createWorkoutSession(session.exercise, result[session.exercise]) : null,
  target: $session,
});

// Подход выполнен и он не последний — начинаем отдых
sample({
  clock: setDoneEv,
  source: { session: $session, isLastSet: $isLastSet },
  filter: ({ session, isLastSet }) => session !== null && !isLastSet,
  fn: ({ session }) => session?.restTime ?? 0,
  target: [restStartedEv, $restTotal, $restLeft],
});

sample({
  clock: tick,
  source: $restLeft,
  filter: (left) => left > 1,
  fn: (left) => left - 1,
  target: $restLeft,
});

sample({
  clock: tick,
  source: $restLeft,
  filter: (left) => left <= 1,
  target: restFinishedEv,
});

// Отдых закончился: звук и следующий подход
sample({
  clock: restFinishedEv,
  target: [playSoundFx, nextSetEv],
});

sample({
  clock: restSkippedEv,
  target: nextSetEv,
});

// Любой переход между подходами или уход со страницы останавливает таймер
sample({
  clock: [nextSetEv, prevSetEv, pageOpenedEv, pageClosedEv],
  target: restStoppedEv,
});

sample({
  clock: nextSetEv,
  source: { index: $setIndex, isLastSet: $isLastSet },
  filter: ({ isLastSet }) => !isLastSet,
  fn: ({ index }) => index + 1,
  target: $setIndex,
});

sample({
  clock: prevSetEv,
  source: $setIndex,
  filter: (index) => index > 0,
  fn: (index) => index - 1,
  target: $setIndex,
});

// Упражнение завершено — переводим прогресс на следующий день
sample({
  clock: exerciseFinishedEv,
  source: { session: $session, progress: ProgressStore.store.$progress },
  filter: ({ session }) => session !== null,
  fn: ({ session, progress }) =>
    session
      ? { progress: { ...progress, [session.exercise]: getNextProgress(session.progress) } }
      : { progress },
  target: saveProgressQuery.start,
});

sample({
  clock: saveProgressQuery.finished.success,
  fn: ({ result }) => result,
  target: ProgressStore.event.progressUpdatedEv,
});

sample({
  clock: saveProgressQuery.finished.failure,
  fn: ({ error }) => {
    notify.show({
      ...WORKOUT_NOTIFICATION.save.failure,
      message: getErrorMessage(error, WORKOUT_NOTIFICATION.save.failure.message),
    });
  },
});

export const WorkoutStore = {
  event: {
    pageOpenedEv,
    pageClosedEv,
    setDoneEv,
    nextSetEv,
    prevSetEv,
    restSkippedEv,
    exerciseFinishedEv,
  },
  store: { $session, $setIndex, $restLeft, $restTotal, $isResting, $isLastSet },
  query: { saveProgressQuery },
  effect: { playSoundFx },
};
