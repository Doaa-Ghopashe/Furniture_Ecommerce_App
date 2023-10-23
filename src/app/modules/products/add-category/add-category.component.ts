import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

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
    
    this.service.addCategory(data.value).subscribe(res=>{
      console.log(res)
    })
  }
}
