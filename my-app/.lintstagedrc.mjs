import { relative } from "node:path";

// На Windows длина командной строки ограничена: при большом коммите проверяем всю папку
const MAX_FILES = 40;

const withFiles = (command, fallback) => (files) =>
  files.length > MAX_FILES
    ? `${command} ${fallback}`
    : `${command} ${files.map((file) => `"${relative(process.cwd(), file)}"`).join(" ")}`;

export default {
  "*.{ts,tsx}": [
    withFiles("prettier --write", "src"),
    withFiles("eslint --fix --max-warnings=0", "src"),
  ],
  "*.{scss,json,md}": [withFiles("prettier --write", ".")],
};
