import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebsocketService } from '../shared/websocket/websocket.service';

const SOCKET_URL = 'ws://localhost:3001/admin';

export interface Image {
  title: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public images: Subject<Image>;

  constructor(websocketService: WebsocketService) {
    const imageSubject = websocketService.connect(SOCKET_URL);

    this.images = <Subject<Image>>imageSubject.pipe(
      map((response: MessageEvent): Image => {
        console.log('admin-service: receiving data from server', response);
        let data = JSON.parse(response.data);
        return {
          title: data.title,
          imageUrl: data.imageUrl,
        };
      }
    ));
  }
}
