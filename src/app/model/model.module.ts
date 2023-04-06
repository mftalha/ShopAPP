import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http'; //http işlemleri için.
import { RestService } from './rest.service';
import { ProductRepository } from './product.repository';
import { CategoryRepository } from './category.repository';
import { Cart } from './cart.model';
import { OrderRepository } from './order.repository';
import { Order } from './order.model';
import { AuthService } from './auth.service';

@NgModule({
    imports : [HttpClientModule],
    providers:[RestService,ProductRepository,CategoryRepository,Cart,Order,OrderRepository,AuthService] //servisleri module eklerken prividers içine ekliyoruz.
})
export class ModelModule{}