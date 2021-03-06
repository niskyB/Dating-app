import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(WsException)
export class SocketExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    console.log(exception);
    this.handleError(client, exception);
  }

  handleError<TClient extends { emit: Function }>(
    client: TClient,
    exception: any,
  ) {
    client.emit('exception', exception.error);
  }
}
