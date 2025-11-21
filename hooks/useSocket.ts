
import { useEffect } from 'react';

export function useSocket(eventName: string, handler: (payload: any) => void, url?: string) {
  useEffect(() => {
    let socket: any;
    let cancelled = false;

    (async () => {
      try {
        const mod: any = await import('socket.io-client');
        const io = mod.io || mod.default;
        const base = url || (import.meta as any).env.VITE_SOCKET_URL || (import.meta as any).env.VITE_API_BASE_URL || window.location.origin;
        if (!cancelled) {
          socket = io(base, { transports: ['websocket'] });
          socket.on(eventName, handler);
        }
      } catch {}
    })();

    return () => {
      cancelled = true;
      if (socket) {
        socket.off(eventName, handler);
        socket.disconnect();
      }
    };
  }, [eventName, handler, url]);
}
