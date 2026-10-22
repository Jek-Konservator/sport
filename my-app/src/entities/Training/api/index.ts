import { getProgress } from "./getProgress";
import { saveProgress } from "./saveProgress";

export const TrainingApi = { getProgress, saveProgress };

export type { SaveProgressInputDto } from "./saveProgress/input.dto";
