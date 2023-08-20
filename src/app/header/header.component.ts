import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { NewAuthService } from '../auth/newauth.service';
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
              private newauthService:NewAuthService,private router:Router){}

  ngOnInit(): void {

    this.userSub = this.newauthService.user.subscribe(user=> {
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
     this.newauthService.logout();

  }
}
