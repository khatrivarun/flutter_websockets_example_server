import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, WebSocket as Socket } from 'ws';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  webSocketServer: Server;

  handleConnection(client: Socket) {
    console.log(`Client Joined`);
    client.send(JSON.stringify({ status: 'ok' }));
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() chat: any,
  ): string {
    console.log(chat);
    client.send(JSON.stringify({ status: 'ok' }));

    return 'Hello world!';
  }
}
