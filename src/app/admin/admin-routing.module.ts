import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth.guard';

import { OrderListComponent } from './orders/order-list/order-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { ProductListComponent } from './products/product-list/product-list.component';


const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  //{path: 'main', component: AdminComponent}, //Auth Guards özelliğinden önce böyle idi
  //{path: 'main', component: AdminComponent, canActivate:[AuthGuard]},
  {path: 'main', component: AdminComponent, canActivate:[AuthGuard],
children: [
  //:mode = biz 'create' mi yoksa 'edit' mi biz ne yazarsak o gelecek ; :id = biz hangi id yi yazar isek o gelecek ==> değişken değer yazmak için.
  {path: 'products/:mode/:id', component: ProductFormComponent},
  {path: 'products/:mode', component: ProductFormComponent}, // id si olmayan Form gelmesi.
  {path: 'products', component: ProductListComponent}, // id si olmayan Form gelmesi.
  {path: 'categories/:mode/:id', component: CategoryListComponent},
  {path: 'categories/:mode', component: CategoryFormComponent}, // id si olmayan Form gelmesi.
  {path: 'categories', component: CategoryListComponent}, // id si olmayan Form gelmesi.
  {path: 'orders', component: OrderListComponent}

]},
  {path: '**', redirectTo: 'auth'} //yukarıdakiler hariç bir url girilirse : path'i auth'a yönlendir.
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
