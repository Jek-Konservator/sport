"use client";

import React from "react";
import type { FC } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { ActionIcon } from "@ui/ActionIcon";
import { Tooltip } from "@ui/Tooltip";
import { useComputedColorScheme, useMantineColorScheme } from "@ui/useColorScheme";
import styles from "./styles.module.scss";

const LABEL = "Сменить тему";

export const ColorSchemeToggle: FC = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

  return (
    <Tooltip label={LABEL}>
      <ActionIcon
        aria-label={LABEL}
        onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
        size="lg"
        variant="default"
      >
        <IconSun className={styles.light} size={20} />
        <IconMoon className={styles.dark} size={20} />
      </ActionIcon>
    </Tooltip>
  );
};
