import { Component } from "@angular/core";
import { CategoryRepository } from "../model/category.repository";
import { Product } from "../model/product.model";
import { Category } from "../model/category.model";
import { ProductRepository } from "../model/product.repository";
import { Cart } from "../model/cart.model";
import { Router } from "@angular/router";

@Component({
  selector: 'shop',
  templateUrl: 'shop.component.html',
  styles: []
})
export class ShopComponent{
    public selectedCategory: Category | undefined = null!; // list grupta class'a active özelliği vermek için.
    public productsPerPage = 4; // sayfalarda kaç ürün gösterilecek.
    public selectedPage = 1; //hangi sayfa etkin. = ürün gösterilen sayfa
    public selectedProducts : Product[] = null as any;
    // 1 * 3 => 3 (0,3)
    // 2 * 3 => 6 (5,3)

    constructor(
        private productRepository : ProductRepository,
        private categoryRepository: CategoryRepository,
        private cart: Cart,
        private router: Router //ürün detayına gitmek için ekledik
        ) {
            this.products; //başlangıçta allProducts'u doldurmak için çağırıyorum
        }

    get products(): Product[]{ // listeler ile sayfaya basabilmek için ürünleri getir.
        let index = (this.selectedPage-1) * this.productsPerPage;
        // sayfada 3'er ürün gösterilmesini istediğimde.
        // 1. sayfada = (1-1) * 3 => 0. veriden başlıyarak al
        // 2. sayfada = (2-1) * 3 => 3. veriden başlıyarak al
        
        this.selectedProducts = this.productRepository
        .getProducts(this.selectedCategory);        

        return this.selectedProducts
        .slice(index,index + this.productsPerPage); //(hangi indexden başlıyacak , kaçıncı veriye kadar alacak) // 0,3 => [0 , 1 , 2] ;; 3,6 => [3 , 4 , 5]
    }

    get pageNumbers(): number[]{
        
        // Math.ceil = 2,4 'ü = 3e yuvarla : yukarı yuarla
        return Array(Math.ceil(this.productRepository
            .getProducts(this.selectedCategory).length / this.productsPerPage))
            .fill(0) // diziye 0 değerini ata
            .map((a,i) => i + 1); // dizinden gelen elemanlar a yı temsil etsin ; i = index numarası ; map bize yeni bir dizi oluşturur 
    }

    changePage(p: number){ // sayfa altında kaçıncı ürün sayfasının gelmesini istediğimiz 
        this.selectedPage = p;
    }

    get categories(): Category[]{
        return this.categoryRepository.getCategories();
    }

    changeCategory(newCategory?:  Category | undefined ){
        this.selectedCategory = newCategory;
        this.selectedPage = 1;
        this.products;
        //this.products;
    }

    //sayfada gösterilecek ürün sayısını değiştiren cmb için
    changePageSize(p : number){
        this.productsPerPage = p;
        this.changePage(1); // alttaki sayfa bilgilerini güncelliyoruz.
    }

    addProductToCart(product: Product){
        this.cart.addItem(product);
        this.router.navigateByUrl('/cart'); //ekle butonuna tıklayınca detay sayfasına yönlen.
    }
}