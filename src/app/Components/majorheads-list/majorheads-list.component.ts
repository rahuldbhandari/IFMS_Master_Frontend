import { Component, OnInit } from '@angular/core';
import { Majorhead, MajorheadResponse } from '../../Models/majorhead';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MajorheadService } from '../../Services/majorhead.service';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-majorheads-list',
  standalone: true,
  imports: [ButtonModule, TableModule, RouterLink],
  templateUrl: './majorheads-list.component.html',
  styleUrl: './majorheads-list.component.css'
})
export class MajorheadsListComponent implements OnInit {
  majorheadList: Majorhead[] = [];
  constructor(private httpService: MajorheadService, private router: Router) { }
  // dataSource!: <IMajorhead>;
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

}
