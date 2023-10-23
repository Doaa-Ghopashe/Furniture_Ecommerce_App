import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm!: FormGroup;
  errorIcon!: IconDefinition;
  categories!: any;

  constructor(private fb: FormBuilder, private category_service: CategoryService, private product_service: ProductService) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(14), Validators.minLength(5)]],
      category: ["", [Validators.required]],
      price: ['', [Validators.required, Validators.max(100000)]],
      quantity: ['', [Validators.required, Validators.max(1000)]],
      offer: ['', [Validators.required, Validators.max(1)]],
      image: ['', [Validators.required]],
      colors: ['', [Validators.required]],
      details: ['', [Validators.required]]
    });
    this.errorIcon = faExclamationTriangle;
    this.category_service.getAllCategories().subscribe((res: any) => {
      this.categories = res.data.Categories
    })
  }

  CreateProduct(data: FormGroup) {
    this.product_service.addProduct(data.value).subscribe((res: any) => {
      console.log(res)
    })
  }

  myDrop(e: Event) {
    e.preventDefault()
  }
  
  dragFun(e: any) {
    e.dataTransfer.setData("color", e.target.value)
  }

  dropMe(e: any) {

    let colorInput = this.productForm.controls['colors'].value;
    let numOfColors = colorInput.split(' ').length;

    if (!colorInput || numOfColors < 5) {
      let choosedColor = e.dataTransfer.getData("color");
      let color = document.createElement('div');
      this.productForm.controls['colors'].setValue(colorInput + ' ' + choosedColor)
      color.style.backgroundColor = choosedColor;
      color.style.height = "100%"
      color.style.width = "50px";
      color.style.marginRight = "10px";
      e.target.appendChild(color);
    }

  }
}
