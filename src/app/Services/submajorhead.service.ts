import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleSubmajorheadResponse, Submajorhead, SubmajorheadResponse } from '../Models/submajorhead';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubmajorheadService {

  apiUrl = environment.BaseURL;
  constructor(private http: HttpClient) { }

  getAllSubMajorheads(): Observable<SubmajorheadResponse> {
    return this.http.get<SubmajorheadResponse>(this.apiUrl + "SubMajorHead");
  }

  getSubMajorheads(submajorId: number): Observable<SingleSubmajorheadResponse> {
    return this.http.get<SingleSubmajorheadResponse>(this.apiUrl + "SubMajorHead/SubMajorHeadById/" + submajorId);
  }
  getSubMajorheadsCode(code: string): Observable<SingleSubmajorheadResponse> {
    return this.http.get<SingleSubmajorheadResponse>(this.apiUrl + "SubMajorHead/SubMajorHeadByCode/" + code);
  }
  createSubMajorheads(submajorheads: Submajorhead): Observable<SingleSubmajorheadResponse> {
    return this.http.post<SingleSubmajorheadResponse>(this.apiUrl + "SubMajorHead/SubMajorHeadAdd", submajorheads);
  }

  deleteSubMajorheads(id: number): Observable<SingleSubmajorheadResponse> {

    return this.http.delete<SingleSubmajorheadResponse>(this.apiUrl + "SubMajorHead/SubMajorHeadDelete/" + id);

  }
  // updateBranches(branchesId: number, branches: IBranches) {
  //   return this.http.put<IBranches[]>(this.apiUrl + "/api/Branches/" + branchesId, branches)
  // }
  updateSubMajorheads(submajorId: number, submajorheads: Submajorhead): Observable<SingleSubmajorheadResponse> {
    return this.http.put<SingleSubmajorheadResponse>(this.apiUrl + "SubMajorHead/SubMajorHeadUpdate/" + submajorId, submajorheads)
  }
}
