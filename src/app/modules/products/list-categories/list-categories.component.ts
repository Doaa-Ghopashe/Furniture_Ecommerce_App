import { Component, Input } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight, faExclamationCircle, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent {
  @Input() allCategories!: Category[];
  @Input() getImageUrl!:Function;

  trashIcon!:IconDefinition;
  infoIcon!:IconDefinition;
  penIcon!:IconDefinition;
  leftChevronIcon!:IconDefinition;
  rightChevronIcon!:IconDefinition;

  constructor(private router:Router, private cartegory_service: CategoryService) { }

  ngOnInit() {

    this.trashIcon = faTrash;

    this.penIcon = faPen;

    this.leftChevronIcon = faChevronLeft;

    this.rightChevronIcon = faChevronRight;

    this.infoIcon = faExclamationCircle;
  }

  DeleteCategory(id:String){
    this.cartegory_service.deleteCategory(id).subscribe({
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
        this.allCategories = this.allCategories.filter(category => category._id !== id);
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

  NavigateToAddCategory() {
    this.router.navigate(['products/add-category'])
  }

  NavigateToEditCategory(id:String) {
    this.router.navigate([`products/edit-category/${id}`])
  }

}
