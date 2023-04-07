// rest service gidip product için özelleşmiş fonskiyonları çağıracaz : filtreli geri dönüşler için.
// component sayfaları : repository'ler ile muhattap olacaklar : servis sınıfları ile değil : servis sınıfları ile repository muhattap olacak. : ve componenet'ler dolaylı olarak servis sınıfındaki methotları kullanmış olacak.

import { Injectable, OnInit} from '@angular/core'
import { Category } from './category.model';
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
        return this.products.find(i => i.id == id);
    }

    getProducts(category: Category = null as any): Product[] { //null olabilir : tüm kategorilerden bir kategori göndermiyorduk.
        if(category)    
            return this.products.filter(p => p.category == category.name);
        else
            return this.products
    }

    saveProduct(product: Product){
        //id var ise update yok ise : create işlemi olacak.
        if(product.id == null || product.id == 0){
            this.restService.addProduct(product)
                .subscribe(p=> this.products.push(p)) //başarılı ise products listesine yeni product'ı ekle : verileri göstermek için kullandığımız dizi.
        }else{
            this.restService.updateProduct(product)
                .subscribe(p=> {
                    this.products.splice(this.products.findIndex(p=> p.id == product.id),1,product);
                    //güncelleme işlemini yapıp başarılı olduktan sonra products listesinde splice ile listeyi ayrıştırıp , findIndex ile ilgili elemanı bulup ,1 diyerek bir sonraki elemanı yani ilgili elemanı ,product ile değiştiriyoruz = product: güncellediğim değer.
                })
        }
    }

    deleteProduct(product: Product){
        this.restService.deleteProduct(product)
            .subscribe(p=> this.products.splice(this.products.findIndex(p=> p.id == product.id),1));
            //silme işlemi sonucu dönen itemin id'si bizim listemizde hangi iteme karşılık geliyor ise onu siliyoruz. : item index'i bul : sil
    }
}