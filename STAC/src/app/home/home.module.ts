import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroComponent } from './hero/hero.component';
import { SearchHotelComponent } from './search-hotel/search-hotel.component';
import { FeaturesComponent } from './features/features.component';


@NgModule({
  declarations: [HomeComponent, HeroComponent, SearchHotelComponent, FeaturesComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
