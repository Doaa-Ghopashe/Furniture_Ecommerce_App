import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { UploadAreaComponent } from 'src/app/components/upload-area/upload-area.component';
import { ListProductsCategoriesComponent } from './list-products-categories/list-products-categories.component';
import { ListProductsComponent } from './list-products/list-products.component';

const routes:Routes = [
  {
    path:"",
    component:ListProductsCategoriesComponent
  },
  {
    path:'add-product',
    component: AddProductComponent
  },
  {
    path:'edit-product',
    component: EditProductComponent
  },
  {
    path:"add-category",
    component:AddCategoryComponent
  },
  {
    path:'edit-category',
    component: EditCategoryComponent
  }
]

@NgModule({
  declarations: [
    AddProductComponent,
    AddCategoryComponent,
    ListCategoriesComponent,
    ListProductsComponent,
    EditCategoryComponent,
    EditProductComponent,
    UploadAreaComponent,
    ListProductsCategoriesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
