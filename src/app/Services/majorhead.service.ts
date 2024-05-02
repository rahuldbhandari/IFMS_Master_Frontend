import { Injectable } from '@angular/core';
import { Majorhead, MajorheadResponse, SingleMajorheadResponse } from '../Models/majorhead';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../Environments/environment';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class MajorheadService {

  apiUrl = environment.BaseURL;

  constructor(private http: HttpClient) { }

  // getAllMajorheadsSub(): Observable<MajorheadResponse[]> {
  //   return this.http.get<MajorheadResponse[]>(this.apiUrl + "MajorHead");
  // }
  getAllMajorheads(): Observable<MajorheadResponse> {
    return this.http.get<MajorheadResponse>(this.apiUrl + "MajorHead");
  }

  getMajorheads(majorId: number): Observable<SingleMajorheadResponse> {
    return this.http.get<SingleMajorheadResponse>(this.apiUrl + "MajorHead/MajorHeadById/" + majorId);
  }
  getMajorheadsCode(code: string): Observable<SingleMajorheadResponse> {
    return this.http.get<SingleMajorheadResponse>(this.apiUrl + "MajorHead/MajorHeadByCode/" + code);
  }
  createMajorheads(majorheads: Majorhead): Observable<SingleMajorheadResponse> {
    return this.http.post<SingleMajorheadResponse>(this.apiUrl + "MajorHead/MajorHeadAdd", majorheads);
  }

  deleteMajorheads(id: number): Observable<SingleMajorheadResponse> {

    return this.http.delete<SingleMajorheadResponse>(this.apiUrl + "MajorHead/MajorHeadDelete/" + id);

  }
  // updateBranches(branchesId: number, branches: IBranches) {
  //   return this.http.put<IBranches[]>(this.apiUrl + "/api/Branches/" + branchesId, branches)
  // }
  updateMajorheads(majorId: number, majorheads: Majorhead): Observable<SingleMajorheadResponse> {
    return this.http.put<SingleMajorheadResponse>(this.apiUrl + "MajorHead/MajorHeadUpdate/" + majorId, majorheads)
  }


}
