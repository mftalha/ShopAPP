import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category.model';
import { Order } from './order.model';
import { Product } from './product.model';
import {map} from 'rxjs/operators';

/* :: burası tamamen servisin nereden çağrılacağı ile ilgili.
@Injectable({
  providedIn: 'root'
})
*/
@Injectable()
export class RestService {

  baseUrl: string= "http://localhost:3500/"; // api url'miz
  token: string = null as any; //kullanıcı token bilgisini tutmak için.
 
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

  addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`${this.baseUrl}products`, product, {
      //bu kısmı ekleme sebebimizin token kontrolü için oluşturduğymuz auth-middkeware.js'de = req.headers['authorization'] alanını eklemiş olmamız : bu kısmı eklemezsek ilgili sayfada return olarak döndürdüğümüz 401 hatasını alırız.
      headers: new HttpHeaders({
        "Authorization": `Bearer<${this.token}>`
      })
    })
  }

  //update methodunun : add methodundan tek farkı => /${product.id}
  updateProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.baseUrl}products/${product.id}`, product, {
      //bu kısmı ekleme sebebimizin token kontrolü için oluşturduğymuz auth-middkeware.js'de = req.headers['authorization'] alanını eklemiş olmamız : bu kısmı eklemezsek ilgili sayfada return olarak döndürdüğümüz 401 hatasını alırız.
      headers: new HttpHeaders({
        "Authorization": `Bearer<${this.token}>`
      })
    })
  }

  deleteProduct(product: Product): Observable<Product>{
    return this.http.delete(`${this.baseUrl}products/${product.id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer<${this.token}>`
      })
    })
  }

  //Observable'nin çalıştırılması sucsicribe edilmesi ile oluyor.
  authentication(username:string, password: string): Observable<boolean>{
    return this.http.post<any>(`${this.baseUrl}login`,{
      username: username,
      password: password
    }).pipe(map(response => { //bize gelen response'yi pipe aracılığı ile kontrol ediyor. ve işlem başarılı ise token'ı dolduruyoruz
      this.token = response.success ? response.token : null;
      console.log(this.token);
      return response.success;
    })); 
  }
  
}

/*
Observable: uyulması gereken.
Rest: Dinlemek
Repository: Depo
*/