import { Component, OnInit } from '@angular/core';
import { ArtistsService } from '../../services/artist.service';
import { Artist } from '../../models/artist.model';
import { NgIf, NgFor } from '@angular/common';
@Component({
  selector: 'app-artists',
  imports: [NgIf, NgFor],
  templateUrl: './artists.component.html',
  styleUrl: '../charts/charts.component.css'
})
export class ArtistsComponent implements OnInit {
  topArtists: Artist[] = [];
  errorMessage: string = '';


  
  constructor(private _artistService: ArtistsService) {}
  
  ngOnInit(): void {
    this.fetchTopArtists();
  }
  
  private fetchTopArtists(): void{
    this._artistService.getTopArtists().subscribe({
      next: (artists) => this.topArtists = artists,
      error: (err) => {
        console.error('Error fetching top artists:', err);
        this.errorMessage = 'Failed to load top artists';
      }
    });
  }
}
