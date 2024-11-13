import { ApiService } from 'src/app/services/api.service';

import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  api = inject(ApiService)

  constructor(private route: Router) {
    localStorage.clear();
  }

  userCredentials: any = {
    email: '',
    password: ''
  };

  signIn() {
    this.api.signIn(this.userCredentials).subscribe((res: any) => {
      if (res.result) {
        localStorage.setItem('token', res.token);
        this.route.navigate(['/home']);
      }
    });
  }
}
