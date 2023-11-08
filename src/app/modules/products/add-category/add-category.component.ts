import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle, faTimesCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  categoryForm!:FormGroup;
  errorIcon!:IconDefinition;
  xIcon!:IconDefinition;
  uploadIcon!:IconDefinition;
  dataTransfer!:DataTransfer;
  multiple:boolean=false;
  constructor(private fb:FormBuilder , private service: CategoryService, private router:Router){}

  ngOnInit(){
    this.categoryForm = this.fb.group({
      name:['',[Validators.required,Validators.minLength(4),Validators.maxLength(14)]],
      image: ['', [Validators.required]]
    });

    this.xIcon = faTimesCircle;
    this.uploadIcon = faUpload
    this.errorIcon = faExclamationTriangle;

    this.dataTransfer = new DataTransfer();
  }

  addItem(newItem: DataTransfer) {
    this.categoryForm.controls['image'].setValue(newItem)
    this.dataTransfer = newItem
  }

  createCategory(){
    let formdata = new FormData();

    formdata.append('image',this.dataTransfer.files[0]);

    formdata.append('name',this.categoryForm.controls['name'].value);

    this.service.addCategory(formdata).subscribe({
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
        });
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
    })
  }

 
}
