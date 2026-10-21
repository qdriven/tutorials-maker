/**
 * 分步播放器（移植自 vivid-dsh src/tutorial/useLessonPlayer.ts）。
 *
 * 与 vivid 的差异：
 * - 不绑 window 键盘——键盘事件由 StageCard 在自己的容器上接管，
 *   避免和卡组级的 ←/→/Space 翻卡打架
 * - 新增 active 参数：卡不是当前卡时暂停自动播放
 */
import { useCallback, useEffect, useState } from "react";

export type StagePlayerStatus = "idle" | "playing" | "paused" | "complete";

export function useStagePlayer(totalFrames: number, interval = 2600, active = true) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const next = useCallback(() => {
    setIsPlaying(false);
    setCurrentFrame((frame) => Math.min(frame + 1, totalFrames - 1));
  }, [totalFrames]);

  const previous = useCallback(() => {
    setIsPlaying(false);
    setCurrentFrame((frame) => Math.max(frame - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentFrame(0);
  }, []);

  const goTo = useCallback(
    (frame: number) => {
      setIsPlaying(false);
      setCurrentFrame(Math.max(0, Math.min(frame, totalFrames - 1)));
    },
    [totalFrames],
  );

  const togglePlaying = useCallback(() => {
    if (currentFrame === totalFrames - 1) setCurrentFrame(0);
    setIsPlaying((playing) => !playing);
  }, [currentFrame, totalFrames]);

  const pause = useCallback(() => setIsPlaying(false), []);

  useEffect(() => {
    if (!isPlaying || !active) return;
    const timer = window.setTimeout(() => {
      setCurrentFrame((frame) => {
        if (frame >= totalFrames - 1) {
          setIsPlaying(false);
          return frame;
        }
        return frame + 1;
      });
    }, interval);
    return () => window.clearTimeout(timer);
  }, [active, currentFrame, interval, isPlaying, totalFrames]);

  const status: StagePlayerStatus = isPlaying
    ? "playing"
    : currentFrame === totalFrames - 1
      ? "complete"
      : currentFrame === 0
        ? "idle"
        : "paused";

  return {
    currentFrame,
    goTo,
    isPlaying,
    next,
    pause,
    previous,
    reset,
    status,
    togglePlaying,
  };
}
