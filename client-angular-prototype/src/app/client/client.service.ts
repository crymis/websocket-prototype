import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebsocketService } from '../shared/websocket/websocket.service';

const SOCKET_URL = 'ws://localhost:3001/';

export interface Message {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public messages: Subject<Message>;

  constructor(websocketService: WebsocketService) {
    const messageSubject = websocketService.connect(SOCKET_URL);

    this.messages = <Subject<Message>>messageSubject.pipe(
      map((response: MessageEvent): Message => {
        console.log('client-service: receiving data from server', response);
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message,
        };
      }
    ));
  }
}
