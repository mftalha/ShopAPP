import { Component } from '@angular/core';

@Component({
  selector: 'root',
  template: "<router-outlet></router-outlet>" 
})
// template: "<router-outlet></router-outlet>"  == diyerek direk başlangıçta rooter yapısını çağır diyorum : rootur yapısı içinde yeni bir sayfa oluşturmadık : app.module içinde  imports kısmında ayarlamaları gerçekleştirdik
export class AppComponent {
}
/*
- template: "<shop></shop>" ==> shop.component.ts nin html kısmındaki yönlendirme ile  shop.component.html sayfasını açıyoruz
*/