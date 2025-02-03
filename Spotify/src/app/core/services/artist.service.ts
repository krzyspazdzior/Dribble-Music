import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Artist } from '../models/artists';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  private _apiUrl = 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10';

  constructor(private _http: HttpClient) {}

  getTopArtists(): Observable<Artist[]> {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      throw new Error('No access token available');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this._http.get<{ items: Artist[] }>(this._apiUrl, { headers }).pipe(
      map(response => response.items),
      catchError(error => {
        console.error('Error fetching artists:', error);
        throw error;
      })
    );
  }
}
