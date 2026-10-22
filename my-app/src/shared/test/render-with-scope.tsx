import React from "react";
import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { fork } from "effector";
import { Provider } from "effector-react";
import { MantineProvider } from "@ui/MantineProvider";
import type { Scope } from "effector";

/** Рендер компонента внутри изолированного effector-scope и MantineProvider */
export const renderWithScope = (ui: ReactElement, scope: Scope = fork()) => ({
  scope,
  ...render(
    <Provider value={scope}>
      <MantineProvider>{ui}</MantineProvider>
    </Provider>,
  ),
});
