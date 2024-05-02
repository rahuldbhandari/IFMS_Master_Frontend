import { Component, OnInit } from '@angular/core';
import { Minorhead } from '../../Models/minorhead';
import { MinorheadService } from '../../Services/minorhead.service';
import { Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-minorheads-list',
  standalone: true,
  imports: [TableModule, ButtonModule, RouterLink],
  templateUrl: './minorheads-list.component.html',
  styleUrl: './minorheads-list.component.css'
})
export class MinorheadsListComponent implements OnInit {
  // ref: DynamicDialogRef | undefined;
  minorheadList: Minorhead[] = [];

  constructor(private httpService: MinorheadService, private router: Router) { }
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
    this.getMinorheadsFormServer();


  }
  getMinorheadsFormServer() {
    this.httpService.getAllMinorHeads().subscribe((response) => {
      // console.log(response);
      if (response.statusCode == 200) {
        this.minorheadList = response.result;
      }


    });
  }

  edit(id: number) {
    // console.log(id);
    this.router.navigateByUrl("/minorheads-form/" + id);

  }

  delete(id: number) {
    // console.log(id);

    this.httpService.deleteMinorHeads(id).subscribe((response) => {
      // console.log(response);
      // this.banksList = this.banksList.filter(x => x.id != id);
      this.getMinorheadsFormServer();


    });
  }
  add() {
    this.router.navigateByUrl("/minorheads-form");
  }
  // ngOnDestroy() {
  //   if (this.ref) {
  //     this.ref.close();
  //   }
  // }

}
