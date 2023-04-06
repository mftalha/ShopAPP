import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  public username!: string;
  public password!: string;
  public errorMessage!: string;

  constructor(private router: Router, private authService: AuthService){

  }

  //NgModül kullanduığımız için modül içine form modülü import etmeliyiz.
  login(form: NgForm){
    if(form.valid){
      this.authService.authenticate(this.username, this.password)
      .subscribe(response=> { //şifre kontrolünü şuan auth-middkewa.js de ki username ve password'a göre yapıyor : ordan geçiyor çünkü apiye veriler. : scriptte öyle ayarladığımız için.
        if(response){ 
          this.router.navigateByUrl('/admin/main');
        }
        this.errorMessage = 'Hatalı username ya da parola';
      }) //subscribe'yi methoda koyduğumuz geri dönüş değeri olan Observable üzerinden çağırıyoruz.
    }else{
      this.errorMessage = 'Bilgileri eksiksiz girin';
    }
  }
}
