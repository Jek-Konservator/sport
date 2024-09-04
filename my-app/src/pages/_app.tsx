import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "@Components/Header";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { InfoStorage } from "@shared/constants";
import { getInfoStorage, setInfoStorage } from "@shared/utils";

dayjs.locale("ru");

export default function App({ Component, pageProps }: AppProps) {
  if (!getInfoStorage()) {
    setInfoStorage(InfoStorage);
  }

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
