import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private _authService: AuthService, private _profileService: ProfileService){};

  ngOnInit(): void {
    this.checkAndRefreshToken();
  }

  authorize(){
    this._authService.redirectToSpotify();
  }
  checkAndRefreshToken(): void{
    if (this._authService.isAccessTokenExpired()){
      console.log('Access token exipred. Refreshing...');
      this._authService.refreshAccessToken().subscribe(
        (response) => {
          console.log('access token refreshed: ', response);
        },
        (error) => {
          console.log('error refreshing access token: ', error);
        }
      )
    } else {
      console.log('Access token is still valid.');
    }
  }
}