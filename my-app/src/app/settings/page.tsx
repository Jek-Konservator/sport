import React from "react";
import type { Metadata } from "next";
import SettingsPage from "@screens/Settings";

export const metadata: Metadata = {
  title: "Настройки",
};

const Page = () => {
  return <SettingsPage />;
};

export default Page;
