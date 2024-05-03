import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Table, TableModule } from 'primeng/table';
import { subdetailservice } from '../../Services/subdetailhead.services.service';
import { ISubdetailhead } from '../../Models/subdetailhead';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subdetailhead-list',
  standalone: true,
  imports: [TableModule, ButtonModule, DialogModule],
  templateUrl: './subdetailhead-list.component.html',
  styleUrl: './subdetailhead-list.component.css'
})
export class SubdetailheadListComponent {
  router = inject(Router);
  subdetailhead!: ISubdetailhead[];
  httpService = inject(subdetailservice);
  // Detailhead: Idetailhead[] = [];
  // constructor(private httpService: HttpService) { }
  // dataSource!: <IMajorhead>;
  totalRecords!: number;

  loading: boolean = false;

  visible: boolean = false;

  selectAll: boolean = false;




  ngOnInit() {
    this.getSubDetailHead();
  }

  getSubDetailHead() {
    this.httpService.getAllSubDetailHead().subscribe((response) => {
      this.subdetailhead = response.result;
      this.loading = false;
      // console.log(this.majorheadList);
    });



  }

  back() {
    this.router.navigate(['/Add-subdetailhead']); // Assuming '/' is the route for your form
  }
  clear(table: Table) {
    table.clear();
  }


  edit(id: number) {
    console.log(id);
    this.visible = true;
    this.router.navigateByUrl("create-subdetailhead/" + id);

  }

  delete(id: number) {
    this.httpService.deleteSubDetailHead(id).subscribe(() => {
      // console.log("delete");
      this.getSubDetailHead();
    });

  }
}
