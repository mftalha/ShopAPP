import { Component } from "@angular/core";
import { AuthService } from "../model/auth.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './admin.componenet.html'
})
export class AdminComponent{

    constructor(private authService: AuthService, private router: Router){}

    // kullanıcının hesabından çıkış yapması için.
    logout(){
        this.authService.clear(); //token bilgisini siliyoruz 
        this.router.navigateByUrl('/shop'); //kullanıcıyı ana sayfaya yönlendiriyoruz
    }
}
