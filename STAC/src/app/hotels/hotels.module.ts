import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelsComponent } from './hotels.component';
import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { HttpClientModule } from '@angular/common/http';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';

@NgModule({
  declarations: [
    HotelsComponent,
    HotelSearchComponent,
    HotelDetailComponent
  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    HttpClientModule,
    NgbModule
  ]
})
export class HotelsModule { }
