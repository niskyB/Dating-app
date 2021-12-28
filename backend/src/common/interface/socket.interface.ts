export interface SocketResponseBody<T> {
  data?: T;
  event: string;
}
