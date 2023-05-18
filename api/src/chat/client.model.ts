import { Socket } from 'socket.io';

export class Client {
    connection: Socket;
    id: number;
    sideId: number;
}