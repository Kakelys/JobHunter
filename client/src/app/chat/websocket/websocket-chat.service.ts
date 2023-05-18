import { Injectable } from "@angular/core";
import { environment as env } from '../../../environments/environment';
import { Socket, io } from "socket.io-client";
import { WebsocketMessage } from './websocket-message.model';
import { Subject } from "rxjs";

@Injectable()
export class WebsocketChatService {
  socket: Socket;
  msgSubject = new Subject<string>();

  constructor() {}

  setup() {
    if(!this.socket) {
      console.log('setup socket')
      this.socket = io(env.chatSocket);
    }
  }

  initClient(accountId: number, sideId: number) {
    if(this.socket) {
      this.disconnect();
    }
    this.setup();

    this.socket.on('message', (message) => {
      // console.log('recieved message', message)
      this.msgSubject.next(message);
    });

    this.socket.on('connect', () => {
      // console.log('connected socket')
      this.socket.emit('connect-client', JSON.stringify({clientId: accountId, sideClientId: sideId}));
    });
  }

  disconnect() {
    if(this.socket) {
      console.log('disconnect socket')
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }

  }

  sendMessage(message: WebsocketMessage) {
    if(!this.socket) {
      console.error('Websocket for chat is not initialized');
      return;
    }

    this.socket.emit('message', JSON.stringify(message));
  }
}
