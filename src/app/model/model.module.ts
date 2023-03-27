import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http'; //http işlemleri için.
import { RestService } from './rest.service';
import { ProductRepository } from './product.repository';
import { CategoryRepository } from './category.repository';

@NgModule({
    imports : [HttpClientModule],
    providers:[RestService,ProductRepository,CategoryRepository] //servisleri module eklerken prividers içine ekliyoruz.
})
export class ModelModule{}