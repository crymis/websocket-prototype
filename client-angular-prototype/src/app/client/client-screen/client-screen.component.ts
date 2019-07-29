import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientService } from '../../client/client.service';

@Component({
  selector: 'app-client-screen',
  templateUrl: './client-screen.component.html',
  styleUrls: ['./client-screen.component.scss'],
  providers: [ ClientService ],
})
export class ClientScreenComponent {
  message: string = '';

  constructor(private clientService: ClientService) {
    clientService.messages.subscribe((e) => {
      console.log('Incoming data from / ', e, 'Author: ', e.author, ' | Message: ', e.message);
    });
  }

  public sendMessage = (wsForm: NgForm) => {
    console.log('sending the following message from client to server', wsForm.value.message);
    this.clientService.messages.next({ author: 'Dan', message: wsForm.value.message });
  }

}
