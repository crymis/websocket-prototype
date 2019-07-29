import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebsocketService } from '../shared/websocket/websocket.service';

const SOCKET_URL = 'ws://localhost:3001/overview';

export interface Image {
  title: string;
  imageUrl: string;
}

export interface Message {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  // public images: Subject<Image>;
  // public messages: Subject<Message>;
  public data: Subject<Message | Image>;

  constructor(websocketService: WebsocketService) {
    const messageOrImageSubject = websocketService.connect(SOCKET_URL);

    this.data = <Subject<Message | Image>>messageOrImageSubject.pipe(
      map((response: MessageEvent): Image => {
        console.log('overview-service: receiving admin-data from server', response);
        let data = JSON.parse(response.data);
        return data;
        // return {
        //   title: data.title,
        //   imageUrl: data.imageUrl,
        // };
      }
    ));
  }
}
