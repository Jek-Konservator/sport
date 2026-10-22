"use client";

import React from "react";
import type { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useUnit } from "effector-react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@ui/Button";
import { Card } from "@ui/Card";
import { Group } from "@ui/Group";
import { SimpleGrid } from "@ui/SimpleGrid";
import { Stack } from "@ui/Stack";
import { Title } from "@ui/Title";
import { NumberInput } from "@shared/forms/adapters/NumberInput";
import { Form } from "@shared/forms/Form";
import { EXERCISE_TITLE } from "@entities/Training/config/constants";
import { ExerciseIcon } from "@entities/Training/ui";
import type { Exercise, Progress } from "@entities/Training/model/types";
import { progressFormSchema } from "../../model/form";
import { SettingsStore } from "../../model/store";
import { PROGRESS_FORM_FIELDS, PROGRESS_FORM_TEXT } from "./config";
import { createOnSubmit } from "./utils/onSubmit";
import type { ProgressFormSchema } from "../../model/form";

interface ProgressFormProps {
  exercise: Exercise;
  progress: Progress;
}

export const ProgressForm: FC<ProgressFormProps> = ({ exercise, progress }) => {
  const { progressSubmittedEv, isPending } = useUnit({
    progressSubmittedEv: SettingsStore.event.progressSubmittedEv,
    isPending: SettingsStore.query.saveProgressQuery.$pending,
  });

  const methods = useForm<ProgressFormSchema>({
    values: progress,
    mode: "onBlur",
    resolver: yupResolver(progressFormSchema),
  });

  return (
    <FormProvider {...methods}>
      <Form<ProgressFormSchema> onSubmit={createOnSubmit(exercise, progressSubmittedEv)}>
        <Card padding="lg" withBorder>
          <Stack gap="lg">
            <Group gap="sm">
              <ExerciseIcon exercise={exercise} size="lg" />
              <Title order={3}>{EXERCISE_TITLE[exercise]}</Title>
            </Group>
            <SimpleGrid cols={3} spacing="sm">
              {PROGRESS_FORM_FIELDS.map(({ label, max, name }) => (
                <NumberInput
                  allowDecimal={false}
                  allowNegative={false}
                  control={methods.control}
                  description={`1–${max}`}
                  key={name}
                  label={label}
                  max={max}
                  min={1}
                  name={name}
                />
              ))}
            </SimpleGrid>
            <Button
              disabled={!methods.formState.isDirty}
              leftSection={<IconDeviceFloppy size={18} />}
              loading={isPending}
              type="submit"
              variant="light"
            >
              {PROGRESS_FORM_TEXT.save}
            </Button>
          </Stack>
        </Card>
      </Form>
    </FormProvider>
  );
};
