import { Component, OnInit } from '@angular/core';
import { ArtistsService } from '../../services/artist.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { Artist } from '../../models/artists';
import { NgIf, NgFor } from '@angular/common';
@Component({
  selector: 'app-artists',
  imports: [NgIf, NgFor, HeaderComponent],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent implements OnInit {
  topArtists: Artist[] = [];
  errorMessage: string = '';

  constructor(private artistService: ArtistsService) {}

  ngOnInit(): void {
    this.artistService.getTopArtists().subscribe({
      next: (artists) => this.topArtists = artists,
      error: (err) => {
        console.error('Error fetching top artists:', err);
        this.errorMessage = 'Failed to load top artists';
      }
    });
  }
}
