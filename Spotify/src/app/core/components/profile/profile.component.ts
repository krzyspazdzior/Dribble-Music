import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';  
import { Profile } from '../../models/profile.model'
import { NgIf } from '@angular/common';
import { HeaderComponent } from "../../shared/header/header.component";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, HeaderComponent, RouterLink, RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: Profile | null = null;
  errorMessage: string = '';
  isLoading: boolean = true; 

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('spotify_token');
    
    if (!token && localStorage.getItem('access_token') == null) {
      this.userProfile = null;
      return;
    }
    
    this.profileService.getUserProfile().subscribe({
      next: (profileData: Profile) => {
        this.userProfile = profileData;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'An error occurred while fetching user data.';
        this.isLoading = false;
        console.error('Error fetching user data:', error);
      }
    });
  }
}