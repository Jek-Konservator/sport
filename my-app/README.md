# Сила за 6 недель

Тренажёр по программе на 6 недель: отжимания → пресс → приседания, таймер отдыха со звуком,
прогресс хранится в `localStorage` браузера.

## Запуск

```bash
npm install
npm run dev     # http://localhost:8080
npm run check   # prettier + eslint + tsc + vitest с покрытием
npm run build
```

## Стек

Next.js 15 (App Router), React 19, TypeScript strict, Mantine 7 через свой UI Kit,
effector, farfetched, patronum, react-hook-form + yup, SCSS-модули, vitest + Testing Library.

`@effector/swc-plugin` закреплён на `0.8.1`: эта версия совместима со SWC в Next 15.5.
При обновлении Next подбирайте версию плагина под новую версию SWC.

## Структура `src/`

| Слой                | Что лежит                                                    |
| ------------------- | ------------------------------------------------------------ |
| `app`               | Роутинг: `/`, `/workout/[exercise]`, `/day-end`, `/settings` |
| `screens`           | Экраны Home, Workout, DayEnd, Settings: UI, сторы, конфиги   |
| `features/Layout`   | Шапка, переключатель темы, загрузка прогресса при старте     |
| `entities/Training` | Программы тренировок, прогресс, API поверх `localStorage`    |
| `services`          | `storage` (localStorage) и `sound` (проигрывание звука)      |
| `shared`            | UI Kit, адаптеры форм, роуты, утилиты                        |

Прогресс хранится под ключом `InfoStorage` в том же формате, что и в старой версии,
поэтому сохранённые данные пользователей подхватываются.
