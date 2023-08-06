import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule as bootstrap } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StokepipePipe } from './pipes/stock/stokepipe.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductcardComponent } from './productcard/productcard.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { FontcolorPipe } from './pipes/fontcolor/fontcolor.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthenticationModule } from './authentication/authentication.module';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NewsbarComponent } from './newsbar/newsbar.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LightningComponent } from './lightning/lightning.component';
@NgModule({
  declarations: [
    AppComponent,
    StokepipePipe,
    NavbarComponent,
    ProductcardComponent,
    ProductlistComponent,
    ProductdetailsComponent,
    NotfoundComponent,
    CartComponent,
    FooterComponent,
    FontcolorPipe,
    NewsbarComponent,
    HomeComponent,
    HeaderComponent,
    LightningComponent
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
    bootstrap,
    CarouselModule, 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
