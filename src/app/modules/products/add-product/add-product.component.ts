import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm!:FormGroup;
  errorIcon!:IconDefinition

  constructor(private fb:FormBuilder){}

  ngOnInit(){
    this.productForm = this.fb.group({
      name:["",[Validators.required,Validators.maxLength(14),Validators.minLength(5)]],
      category:["",[Validators.required]],
      price:['',[Validators.required,Validators.max(100000)]],
      quantity:['',[Validators.required,Validators.max(1000)]],
      offer:['',[Validators.required,Validators.max(1)]],
      image:['',[Validators.required]],
      colors:['',[Validators.required]],
      details:['',[Validators.required]]
    });
    this.errorIcon = faExclamationTriangle
  }

  CreateProduct(e:any){
    console.log(e)
  }

  myDrop(e: any) {
    e.preventDefault()
  }
  dragFun(e: any) {

    e.dataTransfer.setData("color", e.target.value)
  }
  dropMe(e: any) {

    let numOfColors = document.getElementsByTagName('option').length;
    let selectlist = document.getElementById("selectColors")
    if (!(numOfColors > 5)) {
      let choosedColor = e.dataTransfer.getData("color");
      let color = document.createElement('div');
      let option = document.createElement('option');
      color.style.backgroundColor = choosedColor;
      color.style.height = "100%"
      color.style.width = "50px"
      color.style.marginRight = "10px"

      e.target.appendChild(color);
      option.value = choosedColor;
      selectlist?.appendChild(option);
    }

  }
}
