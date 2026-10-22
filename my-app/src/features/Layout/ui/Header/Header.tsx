import React from "react";
import Link from "next/link";
import type { FC } from "react";
import { IconFlame, IconSettings } from "@tabler/icons-react";
import { ActionIcon } from "@ui/ActionIcon";
import { Container } from "@ui/Container";
import { Group } from "@ui/Group";
import { Text } from "@ui/Text";
import { ThemeIcon } from "@ui/ThemeIcon";
import { Tooltip } from "@ui/Tooltip";
import { ROUTES } from "@shared/constants";
import { ColorSchemeToggle } from "../ColorSchemeToggle";
import { HEADER_TEXT } from "./config";
import styles from "./styles.module.scss";

export const Header: FC = () => {
  return (
    <Container className={styles.root} h="100%" size="md">
      <Group h="100%" justify="space-between">
        <Link aria-label={HEADER_TEXT.home} className={styles.logo} href={ROUTES.home}>
          <ThemeIcon radius="md" size="lg" variant="gradient">
            <IconFlame size={20} />
          </ThemeIcon>
          <Text fw={800} size="lg">
            {HEADER_TEXT.logo}
          </Text>
        </Link>
        <Group gap="xs">
          <ColorSchemeToggle />
          <Tooltip label={HEADER_TEXT.settings}>
            <ActionIcon
              aria-label={HEADER_TEXT.settings}
              component={Link}
              href={ROUTES.settings}
              size="lg"
              variant="default"
            >
              <IconSettings size={20} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Container>
  );
};
