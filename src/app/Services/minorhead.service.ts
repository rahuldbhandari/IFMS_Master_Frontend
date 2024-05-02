import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Minorhead, MinorheadResponse, SingleMinorheadResponse } from '../Models/minorhead';

@Injectable({
  providedIn: 'root'
})
export class MinorheadService {
  apiUrl = environment.BaseURL;
  constructor(private http: HttpClient) { }

  getAllMinorHeads(): Observable<MinorheadResponse> {
    return this.http.get<MinorheadResponse>(this.apiUrl + "MinorHead");
  }

  getMinorHeads(minorheadId: number): Observable<SingleMinorheadResponse> {
    return this.http.get<SingleMinorheadResponse>(this.apiUrl + "MinorHead/MinorHeadById/" + minorheadId);
  }
  createMinorHeads(minorheads: Minorhead): Observable<SingleMinorheadResponse> {
    return this.http.post<SingleMinorheadResponse>(this.apiUrl + "MinorHead/MinorHeadAdd", minorheads);
  }

  deleteMinorHeads(id: number): Observable<SingleMinorheadResponse> {

    return this.http.delete<SingleMinorheadResponse>(this.apiUrl + "MinorHead/MinorHeadDelete/" + id);

  }
  // updateBranches(branchesId: number, branches: IBranches) {
  //   return this.http.put<IBranches[]>(this.apiUrl + "/api/Branches/" + branchesId, branches)
  // }
  updateMinorHeads(minorId: number, minorheads: Minorhead): Observable<SingleMinorheadResponse> {
    return this.http.put<SingleMinorheadResponse>(this.apiUrl + "MinorHead/MinorHeadUpdate/" + minorId, minorheads)
  }
}
