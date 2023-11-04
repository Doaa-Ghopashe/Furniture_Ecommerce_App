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
    console.log(formdata.get('images'));
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

  selectFile() {
    document.getElementsByTagName('input')[4].click();

    setTimeout(() => {
      this.productForm.controls['image'].markAsTouched()
    }, 1000);
  }

  fetchFiles(e: any) {
    if(e.target.files.length > 5 && this.dataTransfer.items.length == 0){
      this.productForm.controls['image'].setValue('')
    }

    if ((e.target.files.length > 5 || this.dataTransfer.items.length > 5)) {
      return console.log("the limit of images should not exceed 5")
    }

    for (const file of e.target.files) {
      this.dataTransfer.items.add(file);
    }

    this.mapFiles();
  }

  mapFiles() {
    const listOfImgs = document.getElementsByClassName('list-group')[0];
    listOfImgs.innerHTML = '';

    if (this.dataTransfer.files.length > 0) {

      for (let i = 0; i < this.dataTransfer.files.length; i++) {

        const imgName = this.dataTransfer.files[i].name,
          imgSize = (this.dataTransfer.files[i].size / (1024)).toFixed(2),
          imgType = this.dataTransfer.files[i].type.split('/')[1],
          imgSrc = URL.createObjectURL(this.dataTransfer.files[i]);

        this.displayImg(listOfImgs, imgName, Number(imgSize), imgType, imgSrc, i);
      }
    }
  }

  displayImg(Imgs: Element, name: string, size: number, type: string, src: string, index: number) {

    const listItem = document.createElement('li'),
      itemInfo = document.createElement('span'),
      deletebtn = document.createElement('i'),
      image = document.createElement('img');

    image.src = src;

    itemInfo.innerHTML = "<b>File name</b>: " +
      ((name.length > 10) ?
        name.substring(0, 20) + '...' + type
        : name);

    itemInfo.innerHTML += "</br><b>File size</b>: " + size + " KB";

    image.classList.add('product-image')

    listItem.appendChild(image);

    listItem.appendChild(itemInfo);

    listItem.classList.add('listItem')

    deletebtn.setAttribute('class', 'deletebtn fa-solid fa-circle-xmark')

    deletebtn.setAttribute('id', String(index));

    deletebtn.onclick = this.deleteImg

    listItem.appendChild(deletebtn);

    Imgs.appendChild(listItem);

  }

  deleteImg = (e: any) => {

    const index = e.target.id;

    this.dataTransfer.items.remove(index);

    if (this.dataTransfer.items.length == 0) {
      this.productForm.controls['image'].setValue('')
    }

    this.mapFiles();

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
