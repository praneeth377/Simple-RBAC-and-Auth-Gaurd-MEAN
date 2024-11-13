import { ApiService } from 'src/app/services/api.service';

import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  api = inject(ApiService)
  users: any = []

  ngOnInit(): void {
      this.showUsers()
  }

  showUsers() {
    this.api.getUsers().subscribe((res) => {
      this.users = res.data
    })
  }
}
