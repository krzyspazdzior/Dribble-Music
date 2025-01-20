import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _clientId: string = '9d95166f73674252ba9e97b35c18797d';
  private _clientSecret: string = '32cb947281a8472589ffcf3b454fefeb';
  private _authUrl: string = 'https://accounts.spotify.com/api/token';
  private _redirectUrl: string = 'http://localhost:4200/callback'
  
  constructor(private http: HttpClient) {}



  getAccessToken(code: string): Observable<any> {

    const body = new HttpParams()
    .set('client-id', this._clientId)
    .set('grant-type', 'authorization_code')
    .set('code', code)
    .set('redirect-url', this._redirectUrl)
    .set('client-secret', this._clientSecret)
  
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http
    .post<any>(this._authUrl, body.toString(), {headers})
    .pipe(
      map(resp => {
        if(resp && resp.access_token){
          this.saveToken(resp.access_token);
        }else{
          throw new Error('Nie udało się uzyskać dostępu');
        }
      })
    )

  }
  saveToken(token: string){
    localStorage.setItem('access_token', token);
  }
  removeToken(token: string){
    localStorage.removeItem('access_token');
  }
}
