import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {  
  
  private _apiUrl = 'https://api.spotify.com/v1/me'; 
  
  
  constructor(private http: HttpClient, private _router: Router) {}
  
  
  get isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('access_token');
    }
    return false;
  }

  getUserProfile(): Observable<Profile> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token not found'); 
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<Profile>(this._apiUrl, { headers }); 
    
  }
  
  logout(): void{
    localStorage.clear();
    this._router.navigateByUrl('/login');
  }

}
