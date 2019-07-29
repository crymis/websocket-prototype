import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';


export interface UrlSubject {
  url: string;
  subject: Subject<MessageEvent>;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private subjects: UrlSubject[] = [];

  constructor() { }

  public connect(url): Subject<MessageEvent> {
    console.log('connecting to subject', this.subjects);
    let urlSubject = this.subjects.find(urlSubject => urlSubject.url === url);
    if (!urlSubject) {
      urlSubject = {
        url,
        subject: this.create(url),
      };
      this.subjects.push(urlSubject);
      console.log("Successfully connected: " + url);
    }
    return urlSubject.subject;
  }

  private create(url): Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws); // bind needed here, because the functions are not called here but only passed to the websocket
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          console.log('websocket.service.ts: sending ws message with: ', data);
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}
