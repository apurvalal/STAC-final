import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrls: ['./search-hotel.component.scss']
})
export class SearchHotelComponent implements OnInit {
  searchLocation = '';
  locationResults = [];
  locationSearchEndpoint =  "https://rapidapi.p.rapidapi.com/locations/search";

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  submitLocation() {
    this.locationResults = [];
    if(this.searchLocation) {
      console.log(this.searchLocation);
      this.http.get(this.locationSearchEndpoint, {                                                                                                                                                                                 
        headers: new HttpHeaders({
          "x-rapidapi-key": "757f3759bfmsh74f3f5ea4da7260p115395jsn10119455aa38",
          "x-rapidapi-host": "hotels4.p.rapidapi.com",
          "useQueryString": "true"
        }),
        params: {
          "query": this.searchLocation,
          "locale": "en_US"
        } 
      }).toPromise().then((resp:any) => {
        console.log(resp);
        if(resp && resp.suggestions && resp.suggestions.length) {
          resp.suggestions.forEach(suggestion => {
            this.locationResults = this.locationResults.concat(suggestion.entities);
          });
        };
      });
    }
  }

  searchByLocationId(destinationId) {
    console.log(destinationId);
    this.router.navigate(['/hotels', { "destinationId": destinationId }]);
  }

}
