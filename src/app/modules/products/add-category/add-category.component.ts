import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  addCategoryForm!:FormGroup;
  errorIcon!:IconDefinition;

  constructor(private fb:FormBuilder , private service: CategoryService){}

  ngOnInit(){
    this.addCategoryForm = this.fb.group({
      name:['',[Validators.required,Validators.minLength(4),Validators.maxLength(14)]]
    });

    this.errorIcon = faExclamationTriangle;
  }

  createCategory(data:FormGroup){
    
    this.service.addCategory(data.value).subscribe({
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
