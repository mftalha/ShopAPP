import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModelModule } from '../model/model.module';
import { ShopComponent } from './shop.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';

//modül sayfalarında olması şart.
@NgModule({
    //ModelModule dediğimde artık : Model Module'nin tüm class larınını shop modül içinde kullabıp : api işlemlerimi gerçekleştirebileceğim.
    imports: [ModelModule, BrowserModule, FormsModule], 
    providers:[],
    declarations: [ShopComponent, NavbarComponent, CartSummaryComponent],
    exports: [ShopComponent] //eğerki modülde component var ise : exports etmeliyiz : farklı modülden erişilmesini istiyor isek. 
    // componnet yok ise direk modülden modülü import edip kullanabiliyoruz : kullanılacak modülün export edilmesine gerek yok
})

export class ShopModule{}
