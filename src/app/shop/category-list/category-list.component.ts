import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { CategoryRepository } from 'src/app/model/category.repository';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent {


  public selectedCategory: Category | undefined = null!; // list grupta class'a active özelliği vermek için.
  @Output() category = new EventEmitter<Category>(); // üst componenete veri atmak için.
  @Input() products: Product[] = [];
  @Input() selectedPage: number = null as any;
  constructor(private categoryRepository: CategoryRepository){}

  get categories(): Category[]{
    return this.categoryRepository.getCategories();
}

changeCategory(newCategory?:  Category | undefined ){
  this.selectedCategory = newCategory;
  this.selectedPage = 1;
  this.products;
  this.category.emit(newCategory); //üst componente verş atmak için.
}

}
