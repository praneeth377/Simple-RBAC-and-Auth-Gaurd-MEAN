import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/allUsers');
  }

  signUp(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/signUp', data);
  }

  signIn(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/signIn', data);
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  haveAccess() {
    var logginToken = localStorage.getItem('token') || '';
    var _finalData = JSON.parse(atob(logginToken.split('.')[1]));
    //console.log(_finalData)
    if (_finalData.role == 'admin') {
      return true;
    } else {
      alert('You are not authorized to access this page')
      return false;
    }
  }
}
