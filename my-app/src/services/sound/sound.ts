/** Проигрывает звук; ошибки автоплея браузера не роняют приложение */
export const playSound = async (src: string): Promise<void> => {
  try {
    await new Audio(src).play();
  } catch {
    // Браузер может запретить звук без взаимодействия пользователя
  }
};
