import { ApiService } from 'src/app/services/api.service';

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  api = inject(ApiService)
  constructor(public router: Router) {}

  signUpData: any = {
    email: '',
    password: '',
    role: ''
  };

  postDetails() {
    this.api.signUp(this.signUpData).subscribe((res: any) => {
      alert("Welcome. Please sign in")
      this.router.navigate(["/"])
    });
  }
}
