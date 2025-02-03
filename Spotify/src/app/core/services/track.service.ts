import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Track } from '../models/track.model';
import { map, catchError, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private _apiUrl = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10';
  
    constructor(private _http: HttpClient) {}
  
    getTopTracks(): Observable<Track[]> {
      const accessToken = localStorage.getItem('access_token');
  
      if (!accessToken) {
        throw new Error('No access token available');
      }
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

      return this._http.get<{ items: Track[] }>(this._apiUrl, { headers }).pipe(
        map(response => response.items),
        catchError(error => {
          console.error('Error fetching artists:', error);
          throw error;
        })
      );
    }
}
