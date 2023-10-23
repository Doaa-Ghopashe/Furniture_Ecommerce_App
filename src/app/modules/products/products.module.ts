import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';

const routes:Routes = [
  {
    path:"",
    component:ListProductsComponent
  },
  {
    path:'addProduct',
    component: AddProductComponent
  }
]

@NgModule({
  declarations: [
    AddProductComponent,
    AddCategoryComponent,
    ListProductsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
