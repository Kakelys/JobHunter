import { ConnectedSocket, MessageBody, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Message } from "./message.model";
import { Client } from "./client.model";
import { Socket, Server } from 'socket.io';
import { Logger } from "@nestjs/common";

@WebSocketGateway({
    cors: {
        origin: [
            'https://localhost:4200',
            'http://localhost:4200',
        ]
    }
})
export class ChatGateway implements OnGatewayDisconnect, OnGatewayInit{

    private readonly logger = new Logger(ChatGateway.name);

    clients: Client[] = [];

    @WebSocketServer() server: Server;

    afterInit(server: any) {
        this.logger.log('Chat gateway initialized');
    }
    
    @SubscribeMessage('connect-client')
    async handleConnection(
        @ConnectedSocket() client: Socket,
        @MessageBody() message: string) {
        console.log('connected', message);
        if(!message)
            return;
            
        try{
            const msg = JSON.parse(message);
            this.clients.push({
                connection: client,
                id: msg.clientId,
                sideId: msg.sideClientId
            });
        } catch(err) {
            this.logger.error(err);
        }
    }

    @SubscribeMessage('message')
    async handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() message: string) {
        console.log('recieve message', message)
        try {
            const msg: Message = JSON.parse(message);
            
            let mineClients = this.clients.filter(c => c.id == msg.from.id);
            mineClients.map(c => c.connection.emit('message', message));

            if(msg.toId == msg.from.id)
                return;

            let sideClients = this.clients
                .filter(c => c.id == msg.toId);

            sideClients.map(c => c.connection.emit('message', message))        
        } 
        catch (err) {
            this.logger.error(err);
        }
    }

    handleDisconnect(@ConnectedSocket() client: Socket) {
        this.clients = this.clients.filter(c => c.connection != client);
    }

}