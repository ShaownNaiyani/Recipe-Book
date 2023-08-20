import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NewAuthService } from "./newauth.service";
import { exhaustMap ,take} from "rxjs/operators";


@Injectable({providedIn:'root'})

export class AuthInterceptorService implements HttpInterceptor{

    constructor(private newauthService:NewAuthService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return this.newauthService.user.pipe(
            take(1),
            exhaustMap( user =>{

                if(!user)
                {
                    return next.handle(req);
                }

                const modifiedReq =req.clone({
                    params : new HttpParams().set('auth', user.email)
                });
                return next.handle(modifiedReq);
            })
        )
        
    }



}