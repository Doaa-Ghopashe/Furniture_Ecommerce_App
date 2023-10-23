import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AuthGaurdService } from './guards/authguard.guard';
import { HomeComponent } from './pages/home/home.component';
import { VerificationComponent } from './components/verification/verification.component';
import { UpdatepasswordformComponent } from './components/updatepasswordform/updatepasswordform.component';
import { ResetpasswordformComponent } from './components/resetpasswordform/resetpasswordform.component';
import { ProductlistComponent } from './pages/productspage/productlist.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';


const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"products",
    component:ProductlistComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"forgettenpassword",
    component:ResetpasswordformComponent
  },
  {
    path:"productdetails/:id",
    component:ProductdetailsComponent
    // canActivate: [AuthGaurdService]
  },
  {
    path:"user/verify/:userId/:uniqueString",
    component:VerificationComponent
    // canActivate: [AuthGaurdService]
  },
  {
    path:"resetpassword/:userId/:uniqueString",
    component:UpdatepasswordformComponent
    // canActivate: [AuthGaurdService]
  },
  {
    path:"cart",
    component:CartComponent
  },
  {
    path:"**",
    component:NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
