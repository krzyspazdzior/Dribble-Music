import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'https://api.spotify.com/v1/me';  // URL API Spotify

  constructor(private http: HttpClient) {}


  // Metoda do pobierania profilu użytkownika
  getUserProfile(): Observable<Profile> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token not found');  // Jeśli token nie istnieje, rzucamy błąd
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<Profile>(this.apiUrl, { headers });  // Wysyłamy zapytanie z tokenem
  }
}
