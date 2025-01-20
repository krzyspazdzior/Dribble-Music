import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})


export class CallbackComponent implements OnInit{
  code: string = '';
  
  constructor(private authService: AuthService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    
  }
  


}
