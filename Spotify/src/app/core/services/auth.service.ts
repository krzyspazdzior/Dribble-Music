import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _clientId: string = '9d95166f73674252ba9e97b35c18797d';
  private _clientSecret: string = '32cb947281a8472589ffcf3b454fefeb';
  private _authUrl: string = 'https://accounts.spotify.com/api/token';
  private _redirectUri: string = 'http://localhost:4200/callback'
  private _profileUrl: string = 'https://api.spotify.com/v1/me';

  constructor(private _http: HttpClient) {}


  private generateVerifier(length: number){
    let text = '';
    const possible = "ABCDEFGHIJKMNLOPQRSTUVWXYZabcdefghijkmnlopqrstuvwxyz0123456789"
    
    for(let i = 0;i < length;i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
 
  async redirectToSpotify(){
    const verifier = this.generateVerifier(128);
    const challenge = await this.generateCodeChallenge(verifier);

    localStorage.setItem('code_verifier', verifier);

    const body = new HttpParams()
    .append('client_id', this._clientId)
    .append('response_type', 'code')
    .append('redirect_uri', this._redirectUri)
    .append('scope', 'user-read-private user-read-email')
    .append('code_challenge_method', 'S256')
    .append('code_challenge', challenge)

    window.location.href = `https://accounts.spotify.com/authorize?${body.toString()}`;
  }

   async generateCodeChallenge(codeVerifier: string): Promise<string>{
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/g, '');
  }


  getAccessToken(code: string): Observable<Token> {
    
    const codeVerifier = localStorage.getItem('code_verifier');
    if (!codeVerifier) {
      throw new Error('Verifier is missing from localStorage');
    }
    const body = new HttpParams()
    .set('grant_type', 'authorization_code')
    .set('code', code)
    .set('client_id', this._clientId)
    .set('client_secret', this._clientSecret)
    .set('redirect_uri', this._redirectUri)
    .set('code_verifier', codeVerifier)
  
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http
    .post<any>(this._authUrl, body, {headers}).pipe(
      map(resp => {
        if(resp && resp.access_token){
          this.saveToken(resp.access_token);
          return resp;
        }else{
            throw new Error('Blad: Nie otrzymano tokenu dostepu');
        }
      }),
      catchError(error => {
        console.error('blad przy probie pobierania tokenu: ', error);
        if(error.error){
          console.error('Szczegoly bledu: ', error.error)
        }
        throw error;
      })
    );
  }
  saveToken(token: string): void{
    localStorage.setItem('access_token', token);
  }
  saveRefreshToken(token: string){
    localStorage.setItem('refresh_token', token)
  }
  removeToken(): void{
    localStorage.removeItem('access_token');
  }
}
