import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [RouterLink, RouterOutlet, HeaderComponent, RouterLinkActive],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnInit{

  constructor(private _authService:AuthService, private router: Router){}

  ngOnInit(): void {
    this._authService.checkAndRefreshToken();
  }
  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
