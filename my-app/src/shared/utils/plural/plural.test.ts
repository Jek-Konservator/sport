import { describe, expect, it } from "vitest";
import { plural } from "./plural";

const FORMS = ["подход", "подхода", "подходов"] as const;

describe("plural", () => {
  it.each([
    [1, "подход"],
    [21, "подход"],
    [2, "подхода"],
    [34, "подхода"],
    [5, "подходов"],
    [11, "подходов"],
    [12, "подходов"],
    [114, "подходов"],
    [0, "подходов"],
  ])("%i → %s", (count, expected) => {
    expect(plural(count, FORMS)).toBe(expected);
  });
});
