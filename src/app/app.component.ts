import { Component ,OnInit } from '@angular/core';
import { RouterOutlet,RouterLink,Router } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TabMenuModule,RouterLink,TableModule,ButtonModule,ReactiveFormsModule,CardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
    items: MenuItem[] | undefined;
   
    activeItem: MenuItem | undefined;

  title = 'DetailHeadUI';

  ngOnInit() {
    this.items = [
        { label: 'Home', icon: 'pi pi-fw pi-home',routerLink:'/detailhead-list' },
        { label: 'Detail-Head', icon: 'pi pi-fw pi-calendar', routerLink:'/create-detailhead' },
        { label: 'Sub-Detail-Head', icon: 'pi pi-fw pi-pencil' ,routerLink:'/detailhead-list'},
       
    ];
    this.activeItem = this.items[0];
}
onActiveItemChange(event: MenuItem) {
  this.activeItem = event;
}

activateLast() {
  this.activeItem = (this.items as MenuItem[])[(this.items as MenuItem[]).length - 1];
}
}
