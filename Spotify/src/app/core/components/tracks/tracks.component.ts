import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { TrackService } from '../../services/track.service';
import { Track } from '../../models/track.model';
import { Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
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

  fetchTopTracks(){
    this._trackService.getTopTracks().subscribe({
      next: (tracks) => this.topTracks = tracks,
      error: (err) => {
        console.error('Error fetching top artists:', err);
        this.errorMessage = 'Failed to load top artists';
      }
    });
  }

}
