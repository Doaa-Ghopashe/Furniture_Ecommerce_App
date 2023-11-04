import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  allCategories: Category[] = new Array();
  allPrds: Product[] = new Array();

  constructor(private router: Router, private product_service: ProductService, private cartegory_service: CategoryService) { }

  ngOnInit() {
    this.product_service.listProducts().subscribe((res: any) => {
      console.log(res);
      
      this.allPrds = res
    })
    this.cartegory_service.getAllCategories().subscribe((res: any) => {
      this.allCategories = res.data.Categories;
    })
  }

  NavigateToAddCategory() {
    this.router.navigate(['products/add-category'])
  }

  NavigateToAddProduct(){
    this.router.navigate(['products/add-product'])
  }

  getImageUrl(image: string): string {
    // Assuming the images are stored in the 'images' directory
    const imageUrl = 'http://localhost:4000' + image.split('public').join('');
    return imageUrl;
  }
}
