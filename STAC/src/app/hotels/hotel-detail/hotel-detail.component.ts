import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  hotelId;
  hotelDetailEndpoint = "https://hotels4.p.rapidapi.com/properties/get-details";
  hotelImagesEndpoint = "https://hotels4.p.rapidapi.com/properties/get-hotel-photos";
  covidInfoEndpoint = "https://api.covid19india.org/state_district_wise.json";
  hotelDetails;
  hotelImages = [];
  covidInfo;
  constructor(private route: ActivatedRoute, private http: HttpClient, config: NgbCarouselConfig) { config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.hotelId = params.get('hotelId');
      this.fetchHotelDetails();
    })
  }

  fetchHotelDetails() {
    console.log(this.hotelId);
    this.hotelImages = [];
    this.http.get(this.hotelDetailEndpoint, {                                                                                                                                                                                 
      headers: new HttpHeaders({
        "x-rapidapi-key": "757f3759bfmsh74f3f5ea4da7260p115395jsn10119455aa38",
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
        "useQueryString": "true"
      }),
      params: {
        "id": this.hotelId,
        "currency": "INR",
        "locale": "en_US",
      }
    }).toPromise().then((resp:any) => {
      console.log(resp);
      this.hotelDetails = resp.data.body;
      this.initCovidInfo();
    });

    this.http.get(this.hotelImagesEndpoint, {                                                                                                                                                                                 
      headers: new HttpHeaders({
        "x-rapidapi-key": "757f3759bfmsh74f3f5ea4da7260p115395jsn10119455aa38",
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
        "useQueryString": "true"
      }),
      params: {
        "id": this.hotelId,
      }
    }).toPromise().then((resp:any) => {
      console.log(resp);
      if(resp.hotelImages && resp.hotelImages.length) {
        if(resp.hotelImages.length > 10) {
          this.hotelImages = this.hotelImages.concat(resp.hotelImages.slice(0,10).map(img => {
            return img.baseUrl.replace('{size}', 'z');
          }));
        } else {
          this.hotelImages = this.hotelImages.concat(resp.hotelImages.map(img => {
            return img.baseUrl.replace('{size}', 'z');
          }));
        }
      }
    });
  }

  initCovidInfo() {
    this.covidInfo = false;
    this.http.get(this.covidInfoEndpoint).toPromise().then((resp:any) => {
      console.log(resp);
      Object.entries(resp).forEach(([key, value]) => {
        Object.entries(value["districtData"]).forEach(([city, covidInfo]) => {
          if(city.toLowerCase() === this.hotelDetails.propertyDescription.address.cityName.toLowerCase()) {
            this.covidInfo = {...(covidInfo as any), cases: [
              {title: 'Active', value: covidInfo['active']},
              {title: 'Confirmed', value: covidInfo['confirmed']},
              {title: 'Deceased', value: covidInfo['deceased']},
              {title: 'Recovered', value: covidInfo['recovered']}
            ]};
          }
        });
     });
    });
  }

}
