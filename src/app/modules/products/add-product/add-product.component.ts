import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faXing, faXingSquare } from '@fortawesome/free-brands-svg-icons';
import { faExclamationTriangle, faTimesCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
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
  files!: FileList;
  xIcon!: IconDefinition;
  uploadIcon!: IconDefinition;
  list: DataTransfer = new DataTransfer();

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
    this.xIcon = faTimesCircle;
    this.uploadIcon = faUpload
    this.errorIcon = faExclamationTriangle;
    this.category_service.getAllCategories().subscribe((res: any) => {
      this.categories = res.data.Categories
    });

  }

  CreateProduct() {
    let formdata = new FormData();

    formdata.append('name', this.productForm.controls['name'].value)
    for (let i = 0; i < this.files.length; i++) {
      formdata.append('image', this.files[i])
    }
    formdata.append('price', this.productForm.controls['price'].value)
    formdata.append('offer', this.productForm.controls['offer'].value)
    formdata.append('quantity', this.productForm.controls['quantity'].value)
    formdata.append('category', this.productForm.controls['category'].value)
    formdata.append('colors', this.productForm.controls['colors'].value)
    formdata.append('details', this.productForm.controls['details'].value)

    this.product_service.addProduct(formdata).subscribe((res: any) => {
      console.log(res)
    })
  }

  UploadImageToArea() {
    document.getElementsByTagName('input')[4].click();
  }

  selectedFile(e: any) {
    this.files = e.target.files;
    this.uploadImgs();
  }
  //////////////////ERROR
  async uploadImgs() {

    const listOfImgs = document.getElementsByClassName('list-group')[0];

    listOfImgs.innerHTML = '';

    // await this.list.items.clear();
    console.log(this.files)
    if (this.files) {
      for (let i = 0; i < 5 && this.list.files.length < 5; i++) {

        let imgName = this.files[i].name,
          imgSize = (this.files[i].size / (1024)).toFixed(2),
          imgType = this.files[i].type.split('/')[1],
          imgSrc = URL.createObjectURL(this.files[i]);

        this.list.items.add(this.files[i]);

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

    image.style.cssText += `width: 15%; 
    margin-right: 10px; 
    border-right: 1px solid #00000036; 
    padding: 0 8px;`;

    listItem.appendChild(image);

    listItem.appendChild(itemInfo);

    listItem.style.cssText += `border-radius: 6px;
    position:relative;
    display: flex;
    padding: 16px 0px;
    border: 1px solid rgba(0, 0, 0, 0.21);
    margin: 5px;
    backdrop-filter: blur(5px);
    background: rgb(0 141 205 / 21%); `;

    deletebtn.setAttribute('class', 'deletebtn fa-solid fa-circle-xmark')

    deletebtn.setAttribute('id', String(index));

    deletebtn.style.cssText += `position: absolute;
    top: 5px;
    right: 5px;
    font-size: 24px;
    cursor:pointer;
    color: #d7d7d7;
    text-shadow: 0px 0px 1px #000000b5;`

    deletebtn.onmouseover = () => {
      deletebtn.style.color = "red"
    }

    deletebtn.onmouseleave = () => {
      deletebtn.style.color = "#d7d7d7"
    }

    deletebtn.onclick = this.deleteImg

    listItem.appendChild(deletebtn);

    Imgs.appendChild(listItem);

  }

  //////////////////ERROR
  deleteImg = async (e: any) => {
    // let index = e.target.id;

    this.list.items.remove(0);

    this.files = this.list.files;

    await this.uploadImgs()
  }
  
  //
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
      color.style.height = "20%"
      color.style.width = "100%";
      color.style.marginBottom = "10px";
      e.target.appendChild(color);
    }

  }
}
