import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private _authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');

    if(accessToken && !this._authService.isAccessTokenExpired()){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    } 
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401){
          return this._authService.refreshAccessToken().pipe(
            switchMap((newToken) => {
              this._authService.saveToken(newToken.access_token, newToken.expies_in);
              this._authService.saveRefreshToken(newToken.refresh_token);

              const newRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken.access_token}`,
                },
              });
              return next.handle(newRequest);
            })
          );
        }
        return throwError(() => err);
      })
    )
  }
}
