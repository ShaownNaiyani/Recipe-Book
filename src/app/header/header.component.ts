import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy{

  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService:DataStorageService,
              private authService:AuthService,private router:Router){}

  ngOnInit(): void {

    this.userSub = this.authService.user.subscribe(user=> {
                  this.isAuthenticated = !user ? false : true; 

      }
    )
      
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe;
  }
  onSaveDate(){

    this.dataStorageService.storeRecipe()

  }
  onFetchDate(){
    this.dataStorageService.fetchRecipeAll().subscribe()

  }
  onLogout(){
     this.authService.logout();

  }
}
