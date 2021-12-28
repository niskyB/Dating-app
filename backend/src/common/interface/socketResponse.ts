import { SocketResponseBody } from './socket.interface';

class SocketResponse {
  public send<T>(data: T, event: string) {
    return {
      data: data,
      event: event,
    } as SocketResponseBody<T>;
  }
}

export const socketResponse = new SocketResponse();
