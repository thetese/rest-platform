import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: true } })
export class KdsGateway {
  @WebSocketServer()
  server: Server;

  notifyOrderUpdate(order: unknown) {
    this.server.emit('order:update', order);
  }
}
