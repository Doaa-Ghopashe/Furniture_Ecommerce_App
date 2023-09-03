import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule as bootstrap } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StokepipePipe } from './pipes/stock/stokepipe.pipe';
import { ProductcardComponent } from './productcard/productcard.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CartComponent } from './cart/cart.component';
import { FontcolorPipe } from './pipes/fontcolor/fontcolor.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthenticationModule } from './authentication/authentication.module';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LightningComponent } from './lightning/lightning.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    StokepipePipe,
    ProductcardComponent,
    ProductlistComponent,
    ProductdetailsComponent,
    NotfoundComponent,
    CartComponent,
    FontcolorPipe,
    HomeComponent,
    HeaderComponent,
    LightningComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    bootstrap,
    CarouselModule, 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
