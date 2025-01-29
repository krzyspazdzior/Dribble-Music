import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Image, Profile } from '../../models/profile.model';
import { NgIf, NgClass } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, NgIf, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
    userProfile: Profile | null = null;
    errorMessage: string = '';
    profilePicture: Image | undefined = undefined;
    isShowMenu = false;

    constructor(public profileService: ProfileService) {}
  

    ngOnInit(): void {
      this.displayUserData();
    }
    
    displayUserData():void {
      const token = localStorage.getItem('spotify_token');
    
      if (!token && localStorage.getItem('access_token') == null) {
        this.userProfile = null;
        return;
      }
    
      this.profileService.getUserProfile().pipe(
        catchError((error) => {
          console.error('Error fetching user data:', error);
          this.errorMessage = 'An error occurred while fetching user data.';
    
          return of(null);
        })
      ).subscribe((profileData: Profile | null) => {
        if (!profileData) {
          return;
        }
    
        this.userProfile = profileData;
    
        if (this.userProfile?.images && this.userProfile.images.length > 0) {
          this.profilePicture = this.userProfile.images[0];
          this.profilePicture.height = 50;
          this.profilePicture.width = 50;
        } else {
          this.profilePicture = {
            url: '/blank_profile.png',
            height: 50,
            width: 50
          };
        }
      });
    }



    toggleMenuDisplay(): void{
      const arrow = document.querySelector('header #loggedIn>div i') as HTMLElement;
      this.isShowMenu = !this.isShowMenu;
      arrow.style.transition = '0.3s all';
      if(this.isShowMenu == true){
        arrow.style.transform = 'rotate(180deg)';
        
      }else{
        arrow.style.transform = 'rotate(0deg)';
        
      }
    }
}
