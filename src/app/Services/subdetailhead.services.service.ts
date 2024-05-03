import { Injectable } from '@angular/core';
import { ISubdetailhead, SubdetailheadResponse, singleSubDetailheadResponse } from '../Models/subdetailhead';
import { Observable } from 'rxjs';
import { environment } from '../Environments/envirnoments';
import { HttpClient } from '@angular/common/http';
import { singleDetailheadResponse } from '../Models/detailhead';

@Injectable({
  providedIn: 'root'
})
export class subdetailservice {
  getAllDetailHead() {
    throw new Error('Method not implemented.');
  }
  // apiUrl="https://localhost:7052";
  // http=inject(HttpClient);

  // constructor() { }
  apiUrl=environment.BaseURL+"SubDetailHead/";
  constructor(private http:HttpClient) { }

  getAllSubDetailHead(): Observable<SubdetailheadResponse> {
    return this.http.get<SubdetailheadResponse>(this.apiUrl);
  }
  
   
   createSubDetailHead(subdetail_head:ISubdetailhead):Observable<singleSubDetailheadResponse>{
     return this.http.post<singleSubDetailheadResponse>(this.apiUrl+"SubDetailHeadAdd/",subdetail_head);
   }
 
 getSubDetailHead(subdetail_headId:number):Observable<singleSubDetailheadResponse>{
   return this.http.get<singleSubDetailheadResponse>(this.apiUrl + subdetail_headId);
  }

  getSubdetailByCode(subdetail_headId:string):Observable<singleSubDetailheadResponse>{
    return this.http.get<singleSubDetailheadResponse>(this.apiUrl +"SubDetailheadByCode/"+ subdetail_headId);
   }
  updateSubDetailHead(subdetail_headId:number,subdetail_head:ISubdetailhead):Observable<singleSubDetailheadResponse>{
   return this.http.put<singleSubDetailheadResponse>(this.apiUrl+"SubDetailUpdate/" +subdetail_headId,subdetail_head);
  }
  deleteSubDetailHead(subdetail_headId: number):Observable<singleSubDetailheadResponse>{
   return this.http.delete<singleSubDetailheadResponse>(this.apiUrl+"SubDetailHeadDelete/" +subdetail_headId);
  }

}
