const DEFAULT_ERROR_MESSAGE = "Что-то пошло не так. Попробуйте ещё раз";

export const getErrorMessage = (error: unknown, fallback = DEFAULT_ERROR_MESSAGE): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};
