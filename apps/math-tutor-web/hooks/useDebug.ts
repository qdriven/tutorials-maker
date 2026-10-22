import * as React from 'react';
import { LogLevel, setLogLevel } from 'livekit-client';
import { useRoomContext } from '@livekit/components-react';

type DebugWindow = Window &
  typeof globalThis & {
    __lk_room?: ReturnType<typeof useRoomContext>;
  };

export const useDebugMode = (options: { logLevel?: LogLevel; enabled?: boolean } = {}) => {
  const room = useRoomContext();
  const logLevel = options.logLevel ?? 'debug';
  const enabled = options.enabled ?? true;

  React.useEffect(() => {
    if (!enabled) {
      setLogLevel('silent');
      return;
    }

    setLogLevel(logLevel ?? 'debug');

    const debugWindow = window as DebugWindow;
    debugWindow.__lk_room = room;

    return () => {
      debugWindow.__lk_room = undefined;
      setLogLevel('silent');
    };
  }, [room, enabled, logLevel]);
};
