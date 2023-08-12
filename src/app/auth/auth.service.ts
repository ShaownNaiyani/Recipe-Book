import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, pipe, throwError, } from "rxjs";
import { catchError,tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponse{
    idToken:string;	
    email:string;	
    refreshToken:string	;
    expiresIn:string;
    localId:string ;
    registered?:boolean;
}
@Injectable({providedIn: 'root'})
export class AuthService{

    tokenExpirationTimer:any;

    user = new BehaviorSubject<User>(null);

    constructor(private http : HttpClient,private router:Router){}

    signup(email:string,password:string){

        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAu5jhsNxvJG4UtNKgf_K3iGm0qF5eomzM',
            { 
                email: email,
                password: password,
                returnSecureToken:true
            })
            .pipe(
                catchError(this.handleError),
                tap(
                    resData =>{
                        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
                    }

                )
            )

    }

    login(email:string,password:string){
        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAu5jhsNxvJG4UtNKgf_K3iGm0qF5eomzM',
            { 
                email: email,
                password: password,
                returnSecureToken:true
            }).pipe(catchError(this.handleError),
                    tap(resData => {
                        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
                    })
            )
    }

    autologin(){
        const userData: {
            email: string,
            id: string,
            _token:string,
            _tokenExpirationDate: string,

        }= JSON.parse(localStorage.getItem('userData'));

        if(!userData)
        {
            return;
        }


        const loadUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate))
        if(loadUser.token){
            this.user.next(loadUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime()- new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }


    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData')

        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer=null;

    }

    autoLogout(expirationDuration: number){

        this.tokenExpirationTimer = setTimeout(() => {

            this.logout();
            
        }, expirationDuration);


    }
    private handleAuthentication(
        email:string,
        userid:string,
        token:string,
        expiresIn:number
    ){
        const expirationDate =new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email,userid,token,expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData',JSON.stringify(user));

    }

    private handleError(errorRes: HttpErrorResponse){
        
            let  errorMessage='An unexpected Error Occur';

            if(!errorRes.error || !errorRes.error.error)
            {

            }

            switch(errorRes.error.error.message){
             case 'EMAIL_EXISTS':
                errorMessage = 'Email address already exists'
                break
             case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email not registered!'
                break
             case 'INVALID_PASSWORD':
                errorMessage = 'Wrong password!'
                break
           }
            return throwError(errorMessage);
         
    }


}