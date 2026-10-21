import { createContext, useContext } from "react";
import type { Card } from "./cards";

/** 一张卡答题/互动通过后上报。quiz 卡答对时触发。 */
export interface CardCallbacks {
  onResolved: (cardIndex: number) => void;
  cardIndex: number;
}

export const CardCallbacksContext = createContext<CardCallbacks>({
  onResolved: () => {},
  cardIndex: 0,
});

export function useCardCallbacks(): CardCallbacks {
  return useContext(CardCallbacksContext);
}

/** 卡片渲染器：注册表 value 的统一签名。active=是否为当前可见卡（stage 播放器等需要） */
export type CardRenderer = React.ComponentType<{ card: Card; active?: boolean }>;
