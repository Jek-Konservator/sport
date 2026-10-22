import React from "react";
import type { Metadata } from "next";
import DayEndPage from "@screens/DayEnd";

export const metadata: Metadata = {
  title: "Тренировка завершена",
};

const Page = () => {
  return <DayEndPage />;
};

export default Page;
