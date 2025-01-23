import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Token } from '../../models/token.model';
import { of } from 'rxjs';
import { catchError } from 'rxjs';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})


export class CallbackComponent implements OnInit{

  code: string = '';
  accessToken: string | null = null;


  countdown: number = 5;
  successMessage: string = "You have successfully logged in!";
  redirectMessage: string = "You will be redirected to your profile in: ";
  
  constructor(
    private _route: ActivatedRoute, private _authService: AuthService, private _router: Router) {}
    
    ngOnInit(): void {
      this.callbackRefresh();
      this.startCountdown();
      
    }

    callbackRefresh(): void{
      const storedToken = localStorage.getItem('access_token');
      if(storedToken) {
        this.accessToken = storedToken;
        console.log('znaleziono token w localStorage', this.accessToken)
        this._router.navigateByUrl('/callback')
        return;
      }

      

      this._route.queryParams.subscribe((params) => {
        this.code = params['code'];
        if (this.code) {
          this._authService.getAccessToken(this.code).pipe(
            catchError((error) => {
              console.error('Blad podczas wymiany kodu na token', error);
              return of(null)
            })
          ).subscribe(
            (token: Token | null) => {
              if(token){
                this.accessToken = token.access_token;
                console.log('Token Dostępu: ', this.accessToken);
  
              } else {
                console.log('Nie mozna dokonac fetchu tokena')
              }
            },
            (error) => console.error('Error getting access token:', error)
          );
        } else {
          console.error('No code found in the URL');
        }
      });
    }
    startCountdown() {
      console.log("Countdown Started")
      const interval = setInterval(() => {
        console.log(`Countdown: ${this.countdown}`);
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(interval);
          this._router.navigateByUrl('/profile')
        }
      }, 1000);
    }
  
}
    

