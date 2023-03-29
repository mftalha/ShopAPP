import { Injectable } from "@angular/core";
import { Product } from "./product.model";

@Injectable() //bir servis olarak kullanmak için Injectable ile işaretledik. : artık constructor içinden bu sınıfı inject edip objesi üzerinden çağrılabilecek.
// kullanabilmek için kullanılacak modülün provider kısmına eklememiz gerekiyor ilgili servisleri.(servisler provider'a eklenir.)

// kart bilgileri = kullanıcı ürün seçtikçe adedi ile : cart itema düşeek ve cartItem'larıda Cart içinde objesini oluşturup tutacaz.
export class Cart{
    public items: CartItem[] = [];
    public itemCount: number= 0;
    public total: number= 0; //kart içindeki ürün fiyat'ı

    addItem(product: Product, quantity: number = 1){
        let item = this.items.find(i=> i.product.id ==  product.id); //cart'a eklemek istediğ ürün daha önce eklenmiş ise cartCount'u arttır sadece.
        if(item != undefined){ //item daha önce eklenmiş ise tanımsız olmıyacak : içinde değer olacak.
            item.quantity+=quantity;
        }else{
            this.items.push(new CartItem(product,quantity)); //ekli değil ise yeni cart ekle.
        }
        this.calculate()
    }

    //cartCount ve total'i günelleyebilmek için. == her yeni kart eklendiğinde mesela ;; CartItem dizisini zaten addıtem ile güncelliyor.
    calculate(){
        this.itemCount =0;
        this.total =0;

        this.items.forEach(item=> {
            this.itemCount+=item.quantity;
            this.total += (item.quantity * item.product.price!); //miktar ile ürünü çarpıp kartın fiyat bilgisi kısmına atıyoruz
        })
    }

    //kullanıcı kartından ürün silmek istediğinde.
    removeItem(id: number){
        let index = this.items.findIndex(i=> i.product.id == id);
        this.items.splice(index,1); // verilen index'den itibaren 1 elemanı sil, splice(index,2) == 2 elemanı sil.
        this.calculate();
    }

    //items ları temizleme
    clear(){
        this.items = [];
        this.itemCount = 0;
        this.total = 0;
    }

    //ürün miktarı üzerinde güncelleme.
    updateQuantity(product: Product, quantity: number){
        let item = this.items.find(i => i.product.id == product.id);
        if(item != undefined){ //ürün var ise
            item.quantity = quantity;
        }
        this.calculate();
    }
}

// 5 numaralı üründen tane
export class CartItem{
    constructor(
        public product: Product,
        public quantity: number) {}
}