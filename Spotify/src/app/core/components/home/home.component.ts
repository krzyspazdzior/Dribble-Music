import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  
})
export class HomeComponent implements OnInit{

  constructor(private _authService:AuthService){}

  ngOnInit(): void {
    this._authService.checkAndRefreshToken();
  }
}
