import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from "src/environments/environment";
import { Message } from "./message.model";

@Injectable()
export class ChatService {
    constructor(private http: HttpClient) {}

    sendMessage(message: string, accountId: number) {
      return this.http.post(env.apiUrl + 'v1/messages', {message: message, accountId: accountId});
    }

    getMessages(accountId: number, page: number, toTake: number, diff: number) {
      return this.http.get<Message[]>(env.apiUrl + 'v1/messages?account_id=' + accountId + '&page=' + page + '&to_take=' + toTake + '&diff=' + diff);
    }

    getChats(page: number, toTake: number) {
      return this.http.get<Message[]>(env.apiUrl + `v1/messages/chats?page=${page}&to_take=${toTake}`)
    }
}
