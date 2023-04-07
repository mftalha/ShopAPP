import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { ProductRepository } from 'src/app/model/product.repository';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  
  editing: boolean = false; 
  product?: Product = new Product();

  constructor(private activeRoute: ActivatedRoute, private repository: ProductRepository, private router: Router){
    //editing false ise : kullanıcı ekleme yapmak istiyor, true ise edit yapmak istiyor diyebiliriz.
    //böylece edit işleminde product içi : id ye göre gerekli verilerle dolacaktır : hem edit , hem create yapabileceğiz : aynı form ile
    this.editing = activeRoute.snapshot.params['mode'] == 'edit';
    //kullanıcı düzenleme yapacaktır
    if(this.editing){
      this.product = repository.getProduct(activeRoute.snapshot.params['id']);
    }
  }

  save(form: NgForm){
    //this.product : html sayfasındaki input'lara binding olduğundan buradan çekmem yeterli sayfadaki verileri alacaktır.
    this.repository.saveProduct(this.product!);
    this.router.navigateByUrl('/admin/main/products');
  }
}
