import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsArgumentsHost } from '@nestjs/common/interfaces';
import { WebSocket as Socket } from 'ws';

@Injectable()
export class AuthGuard implements CanActivate {
  public authenticateWsRequest(wsArgumentHost: WsArgumentsHost): boolean {
    const client = wsArgumentHost.getClient<Socket>();
    const data = wsArgumentHost.getData();

    if (!data.authenticated) {
      client.send(JSON.stringify({ error: ['UNAUTHENTICATED'] }));
      return false;
    } else {
      return true;
    }
  }

  canActivate(context: ExecutionContext): boolean {
    return this.authenticateWsRequest(context.switchToWs());
  }
}
