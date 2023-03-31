import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category.model';
import { Order } from './order.model';
import { Product } from './product.model';

/* :: burası tamamen servisin nereden çağrılacağı ile ilgili.
@Injectable({
  providedIn: 'root'
})
*/
@Injectable()
export class RestService {

  baseUrl: string= "http://localhost:3500/"; // api url'miz

  constructor(private http: HttpClient) { }

  //şuan bu haliyle veriyi çekmez fonksiyon altındada belirtildiği gibi ().subcribe diyerek verileri çekebiliyoruz.
  getProducts(): Observable<Product[]>{
    //return this.http.get(`${this.baseUrl}products`);
    return this.http.get<Product[]>(`${this.baseUrl}products`);
  }
  //getProduct().subcribe() == yazdığımda veriler gelecektir.

  getCategories(): Observable<Category[]>{ 
    return this.http.get<Category[]>(`${this.baseUrl}categories`);
  }

  // sipariş eklemek için.
  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}orders`, order)
  }
  
}

/*
Observable: uyulması gereken.
Rest: Dinlemek
Repository: Depo
*/