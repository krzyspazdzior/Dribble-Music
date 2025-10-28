import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { TrackService } from '../../services/track.service';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-tracks',
  imports: [NgIf, NgFor],
  templateUrl: './tracks.component.html',
  styleUrl: '../charts/charts.component.css'
})
export class TracksComponent implements OnInit {
  topTracks: Track[] = [];
  errorMessage: string = '';

  constructor(private _trackService: TrackService) {}

  ngOnInit(): void {
    this.fetchTopTracks()
  }

  private fetchTopTracks(): void{
    this._trackService.getTopTracks().subscribe({
      next: (tracks) => {
          // this.topTracks = tracks.sort((a, b) => b.popularity - a.popularity);
            this.topTracks = tracks;
        },

      error: (err) => {
        console.error('Error fetching top artists:', err);
        this.errorMessage = 'Failed to load top artists';
      }
    });
  }

}
