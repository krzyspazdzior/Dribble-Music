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
    this._authService.checkAndRefreshToken();
  }

  authorize(){
    this._authService.redirectToSpotify();
  }
}