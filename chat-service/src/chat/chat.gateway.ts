import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) { }
  @WebSocketServer()
  server: Server

  @SubscribeMessage('searchProduct')
  async handleSearchProduct(@MessageBody() payload: { query: string }, @ConnectedSocket() client: Socket): Promise<void> {
    console.log("chat.gatewayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    const products = await this.chatService.searchProducts(payload.query);
    console.log(products)
    client.emit('searchProduct', products);
  }
}
