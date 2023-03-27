import { NgModule } from '@angular/core'
import { ModelModule } from '../model/model.module';

//modül sayfalarında olması şart.
@NgModule({
    imports: [ModelModule], //ModelModule dediğimde artık : Model Module'nin tüm
    providers:[]
})

export class ShopModule{}
