import { Component, OnDestroy, OnInit } from '@angular/core';
import { Majorhead, MajorheadResponse } from '../../Models/majorhead';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MajorheadService } from '../../Services/majorhead.service';
import { TableModule } from 'primeng/table';
import { MajorheadsFormComponent } from '../majorheads-form/majorheads-form.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';



@Component({
  selector: 'app-majorheads-list',
  standalone: true,
  imports: [ButtonModule, TableModule, RouterLink],
  // providers: [DialogService],
  templateUrl: './majorheads-list.component.html',
  styleUrl: './majorheads-list.component.css'
})
export class MajorheadsListComponent implements OnInit {
  // ref: DynamicDialogRef | undefined;
  majorheadList: Majorhead[] = [];

  constructor(private httpService: MajorheadService, private router: Router) { }
  // dataSource!: <IMajorhead>;
  // show() {
  //   this.ref = this.dialogService.open(MajorheadsFormComponent, {

  //     header: 'Select a Product',
  //     width: '50vw',
  //     modal: true,
  //     breakpoints: {
  //       '960px': '75vw',
  //       '640px': '90vw'
  //     },
  //   });
  // }
  ngOnInit() {
    this.getMajorheadsFormServer();


  }
  getMajorheadsFormServer() {
    this.httpService.getAllMajorheads().subscribe((response) => {
      // console.log(response);
      if (response.statusCode == 200) {
        this.majorheadList = response.result;
      }


    });
  }

  edit(id: number) {
    // console.log(id);
    this.router.navigateByUrl("/majorheads-form/" + id);

  }

  delete(id: number) {
    // console.log(id);

    this.httpService.deleteMajorheads(id).subscribe((response) => {
      // console.log(response);
      // this.banksList = this.banksList.filter(x => x.id != id);
      this.getMajorheadsFormServer();


    });
  }
  add() {
    this.router.navigateByUrl("/majorheads-form");
  }
  // ngOnDestroy() {
  //   if (this.ref) {
  //     this.ref.close();
  //   }
  // }

}
