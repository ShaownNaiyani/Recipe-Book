import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, pipe, throwError, } from "rxjs";
import { catchError,tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponse{
    _id: string,
    email:string
}
@Injectable({providedIn: 'root'})
export class NewAuthService{

    // tokenExpirationTimer:any;

    user = new BehaviorSubject<User>(null);

    constructor(private http : HttpClient,private router:Router){}

    signup(email:string,password:string){

        return this.http.post<AuthResponse>(
            'http://localhost:3000/user/signup',
            { 
                email: email,
                password: password
            })
            .pipe(
                catchError(this.handleError),
                tap(
                    resData =>{
                        this.handleAuthentication(resData.email);
                    }

                )
            )

    }

    login(email:string,password:string){
        return this.http.post<AuthResponse>(
            'http://localhost:3000/user/login',
            { 
                email: email,
                password: password
            }).pipe(
                    catchError(this.handleError),
                    tap(resData => {
                        this.handleAuthentication(resData.email)
                    })
            )
    }
    
    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
    }
    private handleAuthentication(
        email:string
    ){
        const user = new User(email);
        this.user.next(user);
        localStorage.setItem('userData',JSON.stringify(user));

    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unexpected error occurred';
      
        if (errorRes.error && errorRes.error.message) {
          switch (errorRes.error.message) {
            case 'Email_Exists':
              errorMessage = 'Email address already exists';
              break;
            case 'Wrong_Password_or_Username':
              errorMessage = 'Wrong Username or Password!';
              break;
          }
        }
      
        return throwError(errorMessage);
      }
      
      


}