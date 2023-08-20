import { Component, OnInit } from '@angular/core';
import { NewAuthService } from './auth/newauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private newauthService:NewAuthService){}

  ngOnInit(): void {
      // this.authService.autologin();
  }
}
