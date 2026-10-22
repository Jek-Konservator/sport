import dayjs from "dayjs";
import "dayjs/locale/ru";

// eslint-disable-next-line import/no-named-as-default-member -- в CJS-сборке dayjs нет именованного locale
dayjs.locale("ru");
