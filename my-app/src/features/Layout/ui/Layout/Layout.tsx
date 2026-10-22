"use client";

import React, { useEffect } from "react";
import type { FC, ReactNode } from "react";
import { useUnit } from "effector-react";
import { AppShell } from "@ui/AppShell";
import { Container } from "@ui/Container";
import { ProgressStore } from "@entities/Training/model/store";
import { Header } from "../Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { progressRequestedEv } = useUnit({
    progressRequestedEv: ProgressStore.event.progressRequestedEv,
  });

  useEffect(() => {
    progressRequestedEv();
  }, [progressRequestedEv]);

  return (
    <AppShell header={{ height: 64 }} padding="md">
      <AppShell.Header withBorder={false}>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Container py="lg" size="md">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
