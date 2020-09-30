import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryStateCityService {

  constructor(private http: HttpClient) { }

  GetCountryStateCity() {
    const header = new HttpHeaders().set('Authorization', 
    'smlmsZ8JwdPwAm_0waT9IBPr6UUcfoY1bRgs3VUyVtwc_1cmyPItES1LR1Ql65eCcD4').set('Accept', "application/json");
    // header.headers({
    //   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJtdmdhZGFnaUBnbWFpbC5jb20ifSwiZXhwIjoxNTY2MjM0ODU0fQ.nMWPN38zptwwDKAo11bFyjhCRuzNhZc6NqqCaYJVxP0",
    //   "Accept": "application/json"
    // });

    return this.http.get("https://www.universal-tutorial.com/api/countries/", {headers: header});
  }
}
