// rest service gidip product için özelleşmiş fonskiyonları çağıracaz : filtreli geri dönüşler için.
// component sayfaları : repository'ler ile muhattap olacaklar : servis sınıfları ile değil : servis sınıfları ile repository muhattap olacak. : ve componenet'ler dolaylı olarak servis sınıfındaki methotları kullanmış olacak.

import { Injectable, OnInit} from '@angular/core'
import { Product } from './product.model'
import { RestService } from './rest.service'

@Injectable()
export class ProductRepository implements OnInit {
    private products: Product[] = [];

    constructor(private restService: RestService){
        //asenkron olarak products'ın içinin dolmasını istediğimden cosntracter'ın içinde gerçekleştiriyorum verileri rest servis üzerinden çekme işlemini.
        //çağrılan componenet oluşturulmadan önce product's ın içinin dolması için.
        this.restService
            .getProducts()
            .subscribe(products => this.products = products);
    }

    ngOnInit() { // ProductRepository oluşturulduğu anda : products dizisinin içine : RestService üzerinden Product bilgileri ile doldurulacak.
        
    }

    //bu id'li verileri getir.
    getProduct(id :number): Product | undefined {
        return this.products.find(i => i.id === id);
    }

    getProducts(): Product[] {
        return this.products;
    }
}