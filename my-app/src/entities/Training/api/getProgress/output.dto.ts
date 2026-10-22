/** Прогресс упражнения в формате localStorage (поле step — уровень) */
export interface ProgressDto {
  week: number;
  day: number;
  step: number;
}

export interface GetProgressOutputDto {
  pushUps?: ProgressDto;
  press?: ProgressDto;
  squats?: ProgressDto;
}
