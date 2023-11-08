import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faXing, faXingSquare } from '@fortawesome/free-brands-svg-icons';
import { faExclamationTriangle, faTimesCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm!: FormGroup;
  
  selectedColors!: String[];
  categories!: any;
  dataTransfer!: DataTransfer;

  errorIcon!: IconDefinition;
  xIcon!: IconDefinition;
  uploadIcon!: IconDefinition;

  colorList !: Element;

  constructor(private fb: FormBuilder, private category_service: CategoryService, private product_service: ProductService, private router:Router) {}

  ngOnInit() {

    this.productForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(14), Validators.minLength(5)]],
      category: ["", [Validators.required]],
      price: ['', [Validators.required, Validators.max(100000)]],
      quantity: ['', [Validators.required, Validators.max(1000)]],
      offer: ['', [Validators.required, Validators.max(1)]],
      image: ['', [Validators.required]],
      colors: ['',[Validators.required]],
      details: ['', [Validators.required]]
    });

    this.xIcon = faTimesCircle;
    this.uploadIcon = faUpload
    this.errorIcon = faExclamationTriangle;

    this.dataTransfer = new DataTransfer();
    this.selectedColors = new Array();
    this.category_service.getAllCategories().subscribe((res: any) => {
      this.categories = res.data.Categories
    });

  }


  addItem(newItem: DataTransfer) {
    this.productForm.controls['image'].setValue(newItem)
    this.dataTransfer = newItem
  }

  CreateProduct() {
    let formdata = new FormData();

    Object.entries(this.productForm.controls).forEach(([key, control]) => {
      if(!(key=='colors'||key=='image')){
        formdata.append(key, control.value);
      }
    });
  
    for (let i = 0; i < this.dataTransfer.files.length; i++) {
      formdata.append('images',this.dataTransfer.files[i]);
    }
    
    formdata.append('colors',JSON.stringify(this.selectedColors))

    this.product_service.addProduct(formdata).subscribe({
      next:(res:any)=>{
        Swal.fire({
          text:res.message,
          showConfirmButton:false,
          timer:5000,
          icon:'success',
          width: 600,
          padding: '3em',
          backdrop: `
            rgba(0,0,0,0.4)
            left top
            no-repeat
          `
        })
        this.router.navigate(['/products']);
      },
      error:(res:any)=>{
        Swal.fire({
          text:res.error.message,
          showConfirmButton:false,
          timer:5000,
          icon:'error',
          width: 600,
          padding: '3em',
          backdrop: `
            rgba(0,0,0,0.4)
            left top
            no-repeat
          `
        })
      }
    });
  }

  myDrop(e: Event) {
    e.preventDefault()
  }
  
  dragFun(e: any) {
    e.dataTransfer.setData("color", e.target.value)
  }

  dropMe(e: any) {
    this.colorList = e.target;
    
    if (this.selectedColors.length < 5) {
      const choosedColor = e.dataTransfer.getData("color");
      this.selectedColors.push(choosedColor);
      this.displayColor();
    }
    this.productForm.controls['colors'].setValue(this.selectedColors[0])

  }

  displayColor() {
    console.log(this.selectedColors)
    this.colorList.innerHTML = "";
    let idx = 0;
    for (const color of this.selectedColors) {

      const deletebtn = document.createElement('button'),
        colorItem = document.createElement('div');

     colorItem.classList.add('colorItem');

      colorItem.style.cssText += `background-color:${color};`;

      deletebtn.classList.add('deletebtnclr');

      deletebtn.innerHTML = "X";

      deletebtn.setAttribute('id', String(idx));

      idx++;

      colorItem.appendChild(deletebtn)

      this.colorList.appendChild(colorItem);

      deletebtn.onclick = this.deleteClr;
    }


  }

  deleteClr = (e: any) => {

    const index = Number(e.target.id);

    this.selectedColors.splice(index, 1);

    if(this.selectedColors.length == 0){
      this.productForm.controls['colors'].setValue('')
    }

    this.displayColor();

  }
}
