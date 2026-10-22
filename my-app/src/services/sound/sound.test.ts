import { afterEach, describe, expect, it, vi } from "vitest";
import { playSound } from "./sound";

describe("playSound", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("проигрывает файл по пути", async () => {
    const play = vi.fn().mockResolvedValue(undefined);
    const AudioMock = vi.fn(() => ({ play }));
    vi.stubGlobal("Audio", AudioMock);

    await playSound("/sounds/timer.mp3");

    expect(AudioMock).toHaveBeenCalledWith("/sounds/timer.mp3");
    expect(play).toHaveBeenCalled();
  });

  it("не падает, если браузер запретил звук", async () => {
    vi.stubGlobal(
      "Audio",
      vi.fn(() => ({ play: vi.fn().mockRejectedValue(new Error("NotAllowedError")) })),
    );

    await expect(playSound("/sounds/timer.mp3")).resolves.toBeUndefined();
  });
});
