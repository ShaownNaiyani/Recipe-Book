// import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { BehaviorSubject, Subject, pipe, throwError, } from "rxjs";
// import { catchError,tap } from "rxjs/operators";
// import { User } from "./user.model";
// import { Router } from "@angular/router";

// export interface AuthResponse{
//     registered?:boolean;
// }
// @Injectable({providedIn: 'root'})
// export class AuthService{

//     tokenExpirationTimer:any;

//     user = new BehaviorSubject<User>(null);

//     constructor(private http : HttpClient,private router:Router){}

//     signup(email:string,password:string){

//         return this.http.post<AuthResponse>(
//             'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAu5jhsNxvJG4UtNKgf_K3iGm0qF5eomzM',
//             { 
//                 email: email,
//                 password: password
//             })
//             .pipe(
//                 catchError(this.handleError),
//                 tap(
//                     resData =>{
//                         this.handleAuthentication(resData.email,resData.)
//                     }

//                 )
//             )

//     }

//     login(email:string,password:string){
//         return this.http.post<AuthResponse>(
//             'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAu5jhsNxvJG4UtNKgf_K3iGm0qF5eomzM',
//             { 
//                 email: email,
//                 password: password
//             }).pipe(
//                     catchError(this.handleError),
//                     tap(resData => {
//                         this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
//                     })
//             )
//     }
//     private handleAuthentication(
//         registered:boolean
//     ){
//         const user = new User(email,password);
//         this.user.next(user);
//         localStorage.setItem('userData',JSON.stringify(user));

//     }

//     private handleError(errorRes: HttpErrorResponse){
        
//             let  errorMessage='An unexpected Error Occur';

//             if(!errorRes.error || !errorRes.error.error)
//             {

//             }

//             if(errorRes.error.error.message){
//                 errorMessage = ''
//             }

//             switch(errorRes.error.error.message){
//              case 'EMAIL_EXISTS':
//                 errorMessage = 'Email address already exists'
//                 break
//              case 'EMAIL_NOT_FOUND':
//                 errorMessage = 'This email not registered!'
//                 break
//              case 'INVALID_PASSWORD':
//                 errorMessage = 'Wrong password!'
//                 break
//            }
//             return throwError(errorMessage);
         
//     }


// }