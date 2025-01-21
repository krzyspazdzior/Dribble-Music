import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Token } from '../../models/token.model';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})


export class CallbackComponent implements OnInit{

  code: string = '';
  accessToken: Token | null = null;

  constructor(
    private _route: ActivatedRoute,        
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      this.code = params['code'];
      if (this.code) {
        this._authService.getAccessToken(this.code).subscribe(
          (token: Token) => {
            this.accessToken = token;
            console.log('Token Dostępu: ', this.accessToken);
          },
          (error) => console.error('Error getting access token:', error)
        );
      } else {
        console.error('No code found in the URL');
      }
    });
  }
  


}
