import { Observable } from 'rxjs';

import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  api = inject(ApiService)

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let jwtToken = req.clone({
          setHeaders: {
              Authorization: `Bearer ${this.api.getToken()}`
          }
      })

      return next.handle(jwtToken)
  }

  constructor() { }
}
