import { Component, OnInit } from '@angular/core';
import { OverviewService, Message, Image } from './overview.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [],
})
export class OverviewComponent {

  currentTopic: Image = {
    title: '[Next Topic]',
    imageUrl: 'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/to_the_moon_v1mv.svg',
  };

  results: Message[] = [];

  constructor(private overviewService: OverviewService) {

    console.log('overviewService:', overviewService.data);

    this.results = [
      { author: 'Dan', message: 'what?' },
      { author: 'Arne', message: 'who?'}
    ];

    overviewService.data.subscribe((msg) => {
      console.log('OverviewComponent: Incoming data', msg);
      if (msg['message']) {
        console.log('...from client', msg);
        this.results.push(msg as Message);
      }
      if (msg['title']) {
        console.log('...from admin', msg);
        this.currentTopic = msg as Image;
      }
    });
  }
}
