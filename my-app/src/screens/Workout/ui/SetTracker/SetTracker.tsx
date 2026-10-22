import React from "react";
import type { FC } from "react";
import { IconCheck } from "@tabler/icons-react";
import classNames from "classnames";
import { Group } from "@ui/Group";
import styles from "./styles.module.scss";

interface SetTrackerProps {
  sets: number[];
  current: number;
}

export const SetTracker: FC<SetTrackerProps> = ({ current, sets }) => {
  return (
    <Group aria-label="Подходы" className={styles.root} component="ol" gap={8} justify="center">
      {sets.map((reps, index) => {
        const isDone = index < current;
        const isCurrent = index === current;

        return (
          <li
            aria-current={isCurrent ? "step" : undefined}
            className={classNames(styles.item, isDone && styles.done, isCurrent && styles.current)}
            // eslint-disable-next-line react/no-array-index-key -- подходы не переставляются, индекс стабилен
            key={index}
          >
            {isDone ? <IconCheck size={16} stroke={3} /> : reps}
          </li>
        );
      })}
    </Group>
  );
};
