"use client";

import React from "react";
import type { ReactNode } from "react";
import { EffectorNext } from "@effector/next";
import { MantineProvider } from "@ui/MantineProvider";
import { Notifications } from "@ui/NotificationSystem";
import { theme } from "@ui/theme";
import "@shared/config/dayjs";
import "@shared/uikit/theme/global.scss";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <EffectorNext>
      <MantineProvider defaultColorScheme="auto" theme={theme}>
        <Notifications position="top-right" />
        {children}
      </MantineProvider>
    </EffectorNext>
  );
};
