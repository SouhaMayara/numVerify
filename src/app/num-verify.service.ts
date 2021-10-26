import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NumVerifyService {

  constructor(private http:HttpClient) { 

  }

  getData() 
  {
    let url="https://restcountries.com/v2/all";
    //"https://apilayer.net/api/countries?access_key=eb588dbf70cb81df1c8d374269db9d18";
    return this.http.get(url);
  }
  
  verify(key,phone,country){
    return this.http.get('https://apilayer.net/api/validate?access_key='+key+'&number='+phone+'&country_code='+country);
  }
}
