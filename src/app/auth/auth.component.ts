import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponse, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";


@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
    
})
export class AuthComponent{

    constructor(private authService: AuthService,private router:Router){}

    isLoginMode = true;
    isLoadingMode = false;
    isRegistered = false;
    error:string = null;

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form:NgForm){

        let authObs: Observable<AuthResponse>

        if(form.valid){
            const email= form.value.email;
            const password = form.value.password;
            this.isLoadingMode = true;

            if(this.isLoginMode){
                authObs= this.authService.login(email,password)
            }
            else
            {
                authObs= this.authService.signup(email,password)

            }
            authObs.subscribe(

                resData =>{
                    console.log(resData);
                    this.isLoadingMode=false;
                    this.router.navigate(['/recipes']);
                },

                errorMessage => {
                    this.error = errorMessage; 
                    this.isLoadingMode = false;
                }
            );
            form.reset();
        }
    }
       
onHandleError(){
    this.error = null;

}

}