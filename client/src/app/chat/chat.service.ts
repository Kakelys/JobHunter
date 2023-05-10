import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from "src/environments/environment";

@Injectable()
export class ChatService {
    constructor(private http: HttpClient) {}

    sendMessage(message: string, accountId: number) {
      return this.http.post(env.apiUrl + 'v1/messages', {message: message, accountId: accountId});
    }

    getMessages(accountId: number, page: number, toTake: number) {
      return this.http.get(env.apiUrl + 'v1/messages?account_id=' + accountId + '&page=' + page + '&to_take=' + toTake);
    }
}
