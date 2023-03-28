import { Component } from "@angular/core";
import { CategoryRepository } from "../model/category.repository";
import { Product } from "../model/product.model";
import { Category } from "../model/category.model";
import { ProductRepository } from "../model/product.repository";

@Component({
  selector: 'shop',
  templateUrl: 'shop.component.html',
  styles: [`
  .pt-100 {padding-top:100px}
`]
})
export class ShopComponent{
    public selectedCategory: Category | undefined = null!; // list grupta class'a active özelliği vermek için.

    constructor(
        private productRepository : ProductRepository,
        private categoryRepository: CategoryRepository
        ) {}

    get products(): Product[]{
        return this.productRepository.getProducts();
    }

    get categories(): Category[]{
        return this.categoryRepository.getCategories();
    }

    changeCategory(newCategory?:  Category | undefined ){
        this.selectedCategory = newCategory;
    }
}