import { Component, OnInit } from '@angular/core';
import { TreasuryServiceService } from '../../Services/treasury-service.service';
import { Router, response } from 'express';
import {TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TreasuryModel } from '../../Models/treasury-model';

@Component({
  selector: 'app-treasury-list',
  standalone: true,
  imports: [TableModule,ButtonModule],
  templateUrl: './treasury-list.component.html',
  styleUrl: './treasury-list.component.css'
})
export class TreasuryListComponent implements OnInit{
  treasuryList: TreasuryModel[] = [];

  constructor( private httpService : TreasuryServiceService, private router: Router){}

  ngOnInit() {

    
  }
  getAllTreasuryDetail(){
    this.httpService.getAllTreasury().subscribe((response)=>{
      console.log(response);
    })
  }


}
