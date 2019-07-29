import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.scss'],
  providers: [ AdminService ],
})
export class AdminScreenComponent {
  message: string = '';

  constructor(private adminService: AdminService) {
    adminService.images.subscribe((e) => {
      console.log('Incoming data from /admin', e);
    });
  }

  public sendMessage = (wsForm: NgForm) => {
    console.log('sending the following message from client to server', wsForm.value);
    this.adminService.images.next({ title: wsForm.value.title, imageUrl: wsForm.value.imageUrl });
  }

}
