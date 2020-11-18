import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroComponent } from './hero/hero.component';
import { SearchHotelComponent } from './search-hotel/search-hotel.component';
import { FeaturesComponent } from './features/features.component';

// import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomeComponent, HeroComponent, SearchHotelComponent, FeaturesComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
  ]
})
export class HomeModule { }
