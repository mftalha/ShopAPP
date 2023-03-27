// rest service gidip product için özelleşmiş fonskiyonları çağıracaz : filtreli geri dönüşler için.
// component sayfaları : repository'ler ile muhattap olacaklar : servis sınıfları ile değil : servis sınıfları ile repository muhattap olacak. : ve componenet'ler dolaylı olarak servis sınıfındaki methotları kullanmış olacak.

import { Injectable, OnInit} from '@angular/core'
import { Product } from './product.model'
import { RestService } from './rest.service'

@Injectable()
export class ProductRepository implements OnInit {
    private products: Product[] = [];

    constructor(private restService: RestService){}

    ngOnInit() { // ProductRepository oluşturulduğu anda : products dizisinin içine : RestService üzerinden Product bilgileri ile doldurulacak.
        this.restService
            .getProducts()
            .subscribe(products => this.products = products);
    }

    //bu id'li verileri getir.
    getProduct(id :number): Product | undefined {
        return this.products.find(i => i.id === id);
    }
}