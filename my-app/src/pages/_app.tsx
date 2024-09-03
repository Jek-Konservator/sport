import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "@Components/Header";
import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
