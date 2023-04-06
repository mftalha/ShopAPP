// bu sayfada url'den direk ilgili url'yi yazarak veya js ile sayfa url sini yazarak login olmadan sayfalara geçişi engellemek için gerekli authentication işlemi yapılmıştır.
// admin modül'de providers kısmına ilgili servis eklendi =  bu sayfa.
// admin-routing.module.ts sayfasında : {path: 'main', component: AdminComponent, canActivate:[AuthGuard]}, sonuna 'canActivate:[AuthGuard]' ekliyerek ilgili url lere geçişten önce kullanıcının login olup olmaması kontrol ediliyor.
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../model/auth.service";


@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private router: Router, private authService: AuthService){}

    // : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
    //paremetreleri yazmak zorunda değiliz.
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        //kullanıcı login olmadıysa authencticated bize false döndürür
        if(!this.authService.authencticated){ // kullanıcı login olmamış ise
            this.router.navigateByUrl('/admin/auth');  //kullanıcıyı login sayfasına yönlendirecez.
            return false;
        }
        return true; //kullanıcı login ise gitmek istediği sayfaya gitmesini sağlıyacağız.
    }

}