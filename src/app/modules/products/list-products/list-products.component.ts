import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight, faExclamationCircle, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  allCategories: Category[] = new Array();
  @Input() allPrds!: Product[];
  @Input() getImageUrl!:Function;

  trashIcon!: IconDefinition;
  infoIcon!: IconDefinition;
  penIcon!: IconDefinition;
  leftChevronIcon!: IconDefinition;
  rightChevronIcon!: IconDefinition;

  constructor(private router: Router, private product_service: ProductService) { }

  ngOnInit() {
    this.trashIcon = faTrash;

    this.penIcon = faPen;

    this.leftChevronIcon = faChevronLeft;

    this.rightChevronIcon = faChevronRight;

    this.infoIcon = faExclamationCircle;
  }

  NavigateToAddProduct() {
    this.router.navigate(['products/add-product'])
  }

  DeleteProduct(id: String) {
    this.product_service.deleteProduct(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          text: res.message,
          showConfirmButton: false,
          timer: 5000,
          icon: 'success',
          width: 600,
          padding: '3em',
          backdrop: `
            rgba(0,0,0,0.4)
            left top
            no-repeat
          `
        });
        this.allPrds = this.allPrds.filter(product => product._id !== id);
      },
      error: (res: any) => {
        Swal.fire({
          text: res.message,
          showConfirmButton: false,
          timer: 5000,
          icon: 'error',
          width: 600,
          padding: '3em',
          backdrop: `
            rgba(0,0,0,0.4)
            left top
            no-repeat
          `
        })
      }
    })
  }
}
