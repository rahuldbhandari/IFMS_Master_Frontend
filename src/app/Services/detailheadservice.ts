import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';
import { Idetailhead, detailheadResponse, singleDetailheadResponse } from '../Models/detailhead';
import { environment } from '../Environments/envirnoments';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // apiUrl="https://localhost:7052";
  // http=inject(HttpClient);

  // constructor() { }
  apiUrl=environment.BaseURL+"DetailHead/";
  constructor(private http:HttpClient) { }

  getAllDetailHead(): Observable<detailheadResponse> {
    return this.http.get<detailheadResponse>(this.apiUrl);
  }
  
   
   createDetailHead(detail_head:Idetailhead):Observable<singleDetailheadResponse>{
     return this.http.post<singleDetailheadResponse>(this.apiUrl+"DetailHeadAdd/",detail_head);
   }
 
 getDetailHead(detail_headId:number):Observable<singleDetailheadResponse>{
   return this.http.get<singleDetailheadResponse>(this.apiUrl + detail_headId);
  }
  getdetailByCode(detail_headId:string):Observable<singleDetailheadResponse>{
    return this.http.get<singleDetailheadResponse>(this.apiUrl +"DetailheadByCode/"+ detail_headId);
   }
  updateDetailHead(detail_headId:number,detail_head:Idetailhead):Observable<singleDetailheadResponse>{
   return this.http.put<singleDetailheadResponse>(this.apiUrl+"DetailHeadUpdate/" +detail_headId,detail_head);
  }
  deleteDetailHead(detail_headId: number):Observable<singleDetailheadResponse>{
   return this.http.delete<singleDetailheadResponse>(this.apiUrl+"DetailHeadDelete/" +detail_headId);
  }

}
