import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products-categories',
  templateUrl: './list-products-categories.component.html',
  styleUrls: ['./list-products-categories.component.css']
})
export class ListProductsCategoriesComponent {
  allCategories: Category[] = new Array();

  allPrds: Product[] = new Array();

  prdInf!: Product;

  constructor(private router: Router, private product_service: ProductService, private cartegory_service: CategoryService) { }

  ngOnInit() {
    this.product_service.listProducts().subscribe((res: any) => {
      this.allPrds = res.data.Products;
    })

    this.cartegory_service.getAllCategories().subscribe((res: any) => {
      this.allCategories = res.data.Categories;
    })
  }

  getImageUrl(image: string): string {
    const imageUrl = 'http://localhost:4000' + image.split('public').join('');
    return imageUrl;
  }

  showProductBox(product: any) {
    this.prdInf = product;
    // let modal = document.getElementsByClassName('modal')[0] as HTMLElement;
    // if (modal) {
    //   modal.style.display = 'block'
    // }
  }

}
