import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {
  SendMessageDto,
  validateSendMessageDto,
} from 'src/dtos/send-message.dto';
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
    @MessageBody() sendMessageDto: SendMessageDto,
  ): void {
    const checkValidation = validateSendMessageDto(sendMessageDto);

    if (checkValidation.length > 0) {
      client.send(JSON.stringify({ errors: checkValidation }));
      return;
    }

    console.log(sendMessageDto);
    client.send(JSON.stringify({ status: 'ok' }));
  }
}
