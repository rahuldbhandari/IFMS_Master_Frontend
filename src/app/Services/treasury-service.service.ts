import { Injectable } from '@angular/core';
import { environment } from '../Environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TreasuryModel } from '../Models/treasury-model';

@Injectable({
  providedIn: 'root'
})
export class TreasuryServiceService {

  apiUrl = environment.baseUrlApi;
  constructor( private http : HttpClient) { }
  getAllTreasury() : Observable<TreasuryModel>{
    return this.http.get<TreasuryModel>(this.apiUrl + "TreasuryModel");
  }
}
