import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CartComponent } from './cart/cart.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGaurdService } from './guards/authguard.guard';
import { HomeComponent } from './pages/home/home.component';
import { VerificationComponent } from './components/verification/verification.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ResetpasswordformComponent } from './components/resetpasswordform/resetpasswordform.component';


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
    component:ResetpasswordComponent
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
