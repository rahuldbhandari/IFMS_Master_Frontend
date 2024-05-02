import { Component, OnInit } from '@angular/core';
import { SubmajorheadService } from '../../Services/submajorhead.service';
import { Router, RouterLink } from '@angular/router';
import { Submajorhead } from '../../Models/submajorhead';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-submajorheads-list',
  standalone: true,
  imports: [TableModule, ButtonModule, RouterLink],
  templateUrl: './submajorheads-list.component.html',
  styleUrl: './submajorheads-list.component.css'
})
export class SubmajorheadsListComponent implements OnInit {
  // ref: DynamicDialogRef | undefined;
  submajorheadList: Submajorhead[] = [];

  constructor(private httpService: SubmajorheadService, private router: Router) { }
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
    this.getSubMajorheadsFormServer();


  }
  getSubMajorheadsFormServer() {
    this.httpService.getAllSubMajorheads().subscribe((response) => {
      // console.log(response);
      if (response.statusCode == 200) {
        this.submajorheadList = response.result;
      }


    });
  }

  edit(id: number) {
    // console.log(id);
    this.router.navigateByUrl("/submajorheads-form/" + id);

  }

  delete(id: number) {
    // console.log(id);

    this.httpService.deleteSubMajorheads(id).subscribe((response) => {
      // console.log(response);
      // this.banksList = this.banksList.filter(x => x.id != id);
      this.getSubMajorheadsFormServer();


    });
  }
  add() {
    this.router.navigateByUrl("/submajorheads-form");
  }
  // ngOnDestroy() {
  //   if (this.ref) {
  //     this.ref.close();
  //   }
  // }

}
