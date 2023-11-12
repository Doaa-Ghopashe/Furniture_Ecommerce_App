import { Component, Input } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight, faExclamationCircle, faExclamationTriangle, faPen, faTimesCircle, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {
  errorIcon!: IconDefinition;
  xIcon!: IconDefinition;
  uploadIcon!: IconDefinition;
  image!:string;
  form!: FormGroup;
  dataTransfer!: DataTransfer;
  multiple: boolean = false;

  constructor(private fb: FormBuilder, private service: CategoryService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    const { id } = this.route.snapshot.params

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(14)]],
      image: ['', [Validators.required]]
    })

    this.service.getCategory(id).subscribe((res: any) => {
      const data = res.data;

      if (data) {
        this.image = data.image;
        this.form = this.fb.group({
          name: [data.name, [Validators.required, Validators.minLength(4), Validators.maxLength(14)]],
          image: [data.image, [Validators.required]]
        });
      } else {
        
      }


    })

    this.xIcon = faTimesCircle;
    this.uploadIcon = faUpload
    this.errorIcon = faExclamationTriangle;

    this.dataTransfer = new DataTransfer();
  }
  addItem(newItem: DataTransfer) {
    // this.categoryForm.controls['image'].setValue(newItem)
    this.dataTransfer = newItem
  }
}
