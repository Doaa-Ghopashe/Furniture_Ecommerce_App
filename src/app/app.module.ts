import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StokepipePipe } from './pipes/stock/stokepipe.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductcardComponent } from './productcard/productcard.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { FontcolorPipe } from './pipes/fontcolor/fontcolor.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StokepipePipe,
    NavbarComponent,
    ProductcardComponent,
    ProductlistComponent,
    RegisterComponent,
    LoginComponent,
    ProductdetailsComponent,
    NotfoundComponent,
    CartComponent,
    FooterComponent,
    FontcolorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
