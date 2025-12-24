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

  sessionFirst: boolean | null = true;

  ngOnInit(): void {
    this._authService.checkAndRefreshToken();
    
    if(localStorage.getItem('warning')==null){
      localStorage.setItem('warning', 'true');
      this.sessionFirst = false
    }
  }

  authorize(){
    this._authService.redirectToSpotify();
  }
}