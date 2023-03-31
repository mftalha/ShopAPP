import { Injectable } from "@angular/core";
import { Cart } from "./cart.model";

@Injectable() 
export class Order{
    public id!: number;
    public name!: string;
    public address!: string;
    public city!: string;
    public phone!: string;
    public email!: string;

    public isSent: boolean = false; // sipariş gönderildimi.

    // injexct mantığı : singleton olarak çalışıyor : böylece projedeki her Cart nesnesi aynı sınıfı temsil ettiğinden heryerdeki değişim heryeri etkiliyor.
    constructor(public cart: Cart){ 

    }

    // sipariş verdiğinde cart'ı sıfırlansın
    clearOrder() {
        this.id = (null as any);
        this.name = this.address = this.city = this.phone = this.email = (null as any);
        this.isSent = false;
        this.cart.clear();
    }
}