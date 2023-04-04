import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShopModule } from './shop/shop.module';
import {RouterModule} from '@angular/router'
import { ShopComponent } from './shop/shop.component';
import { CartDetailComponent } from './shop/cart-detail/cart-detail.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ShopModule,
    RouterModule.forRoot([
      {path: 'shop', component: ShopComponent},
      {path: 'cart', component: CartDetailComponent},
      {path: 'checkout', component: CheckoutComponent},
      {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }, //dinamik olarak adrese yönkendirme için.
      {path: '**', redirectTo: "/shop"} //yukarıdakiler hariç başka bir yönlendirmede shop'a yönlendir.
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
