import { Injectable } from "@angular/core";
import { RestService } from "./rest.service";
import { Observable } from "rxjs";

@Injectable() //servis oldugunu işaretliyoruz.
export class AuthService{
    constructor(private restService: RestService){

    }

    //kullanıcının giriş yapması : doğru bilgiler ile giriş yapar ise token verecez.
    authenticate(username: string, password: string): Observable<boolean>{
        return this.restService.authentication(username,password);
    }

    //kullanıcının token alıp almadığının kontrolü.
    get authencticated(): boolean{
        return this.restService.token != null;
    }
     
    //kullanıcının logout işlemi yaptığında token'ı temizlecez
    clear(){
        this.restService.token = null as any;
    }
}