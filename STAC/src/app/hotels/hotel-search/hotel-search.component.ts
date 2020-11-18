import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.scss']
})
export class HotelSearchComponent implements OnInit {
  destinationId;
  hotelSearchEndpoint = "https://rapidapi.p.rapidapi.com/properties/list";
  hotelResults = [];
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.destinationId = params.get('destinationId');
      console.log(this.destinationId);
      this.fetchHotels();
    })
    // this.route.paramMap.pipe(
    //   switchMap(params => {
    //     console.log(params.get('destinationId'));
    //   })
    // );
  }

  fetchHotels() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let checkIn = yyyy + '-' + mm + '-' + dd;
    this.http.get(this.hotelSearchEndpoint, {                                                                                                                                                                                 
      headers: new HttpHeaders({
        "x-rapidapi-key": "757f3759bfmsh74f3f5ea4da7260p115395jsn10119455aa38",
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
        "useQueryString": "true"
      }),
      params: {
        "destinationId": this.destinationId,
        "pageNumber": "1",
        "checkIn": checkIn,
        "checkOut": checkIn,
        "pageSize": "25",
        "adults1": "1",
        "currency": "INR",
        "locale": "en_US",
        "sortOrder": "BEST_SELLER"
      }
    }).toPromise().then((resp:any) => {
      console.log(resp);
      if(resp && resp.data && resp.data.body && resp.data.body.searchResults && resp.data.body.searchResults.results && resp.data.body.searchResults.results.length) {
        this.hotelResults = resp.data.body.searchResults.results;
      };
    });
  }

  getHotelPrice(hotel) {
    if(hotel && hotel.ratePlan && hotel.ratePlan.price && hotel.ratePlan.price.current) {
      return hotel.ratePlan.price.current;
    }
    return 'Unavailable';
  }

  goToHotelDetails(hotel) {
    this.router.navigate(['/hotels/hotel-detail', { "hotelId": hotel.id }]);
  }

}
