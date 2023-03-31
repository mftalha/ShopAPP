import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from 'src/app/model/order.model';
import { OrderRepository } from 'src/app/model/order.repository';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  orderSent: boolean = false;
  submitted: boolean = false;

  constructor(public order: Order, private orderRepository: OrderRepository) {}

  submitOrder(form: NgForm) {
    this.submitted = true;

    // bize gelecek form NgForm
    if(form.valid){ //true ise == kullanıcı tüm required gerekliliklerini yerine getirmiştir.
      this.orderRepository.saveOrder(this.order)
      .subscribe(order =>{
        // kullanıcının tekrar'dan yeni sipariş verebilmesi için hazırlık.
        this.order.clearOrder(); // kullanıcının kart bilgileri silinecek. 
        this.orderSent = true;
        this.submitted = false;
      })
    }
  }
}
