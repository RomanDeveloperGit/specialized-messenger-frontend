import { Socket as RawSocket } from 'socket.io-client';

import type { SocketEmitEventsMap, SocketListenEventsMap } from './events';

export type Socket = RawSocket<SocketListenEventsMap, SocketEmitEventsMap>;
