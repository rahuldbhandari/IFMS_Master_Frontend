import { Component, inject } from '@angular/core';
import { Idetailhead, detailheadResponse } from '../../Models/detailhead';
import { HttpService } from '../../Services/detailheadservice';
import { Router } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { LazyLoadEvent } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';




@Component({
  selector: 'app-detailheal-list',
  standalone: true,
  imports: [TableModule,ButtonModule,DialogModule],
  templateUrl: './detailhead-list.component.html',
  styleUrl: './detailheal-list.component.css'
})
export class DetailListComponent {
  router=inject(Router);
  detailhead!:Idetailhead[];
  httpService=inject(HttpService);
  // Detailhead: Idetailhead[] = [];
  // constructor(private httpService: HttpService) { }
  // dataSource!: <IMajorhead>;
  totalRecords!: number;

  loading: boolean = false;

  visible: boolean = false;

  selectAll: boolean = false;



 
  ngOnInit() 
  {
    this.getDetailHead();
  }
  getDetailHead(){
    this.httpService.getAllDetailHead().subscribe((response) => {
      this.detailhead = response.result;
      this.loading = false;
      // console.log(this.majorheadList);

    });

    

  }
 
    back() {
      this.router.navigate(['/Add-DetailHead']); // Assuming '/' is the route for your form
    }
    clear(table: Table) {
      table.clear();
  }

 
edit(id: number){
  // console.log(id);
  this.visible = true;
this.router.navigateByUrl("create-detailhead/"+id);

}

delete(id: number){
  this.httpService.deleteDetailHead(id).subscribe(()=>{
    // console.log("delete");
    this.getDetailHead();
  }); 

}
}
