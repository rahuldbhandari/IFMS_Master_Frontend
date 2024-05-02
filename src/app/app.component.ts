import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MajorheadsListComponent } from './Components/majorheads-list/majorheads-list.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api/menuitem';
import { DropdownModule } from 'primeng/dropdown';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, TabMenuModule, RouterLink, MajorheadsListComponent, DropdownModule, RouterModule, ToolbarModule, TieredMenuModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IfmsUI';

  constructor(private router: Router) { }

  // submit() {
  //   console.log('hi');

  //   this.router.navigate(['/majorhead-list']);
  // }

  // items: MenuItem[] | undefined;

  // activeItem: MenuItem | undefined;
  items: MenuItem[] | undefined;


  ngOnInit() {
    // this.items = [
    //   { label: 'Home', icon: 'pi pi-fw pi-home' },
    //   { label: 'Major Heads', routerLink: '/majorheads-list' },
    //   { label: 'SubMajor Heads', routerLink: '/majorheads-list' },
    //   { label: 'Minor Heads', routerLink: '/majorheads-list' },

    // ];
    // this.activeItem = this.items[0];
    this.items = [
      {
        label: 'Major Heads',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Major Head',
            route: '/majorheads-list'
          },
          {
            label: 'SubMajor Head',
            route: '/submajorheads-list'
          }, {
            label: 'Minor Head',
            route: '/minorheads-list'
          }
        ]
      },


    ];
  }
  // onActiveItemChange(event: MenuItem) {
  //   this.activeItem = event;
  // }

  // activateLast() {
  //   this.activeItem = (this.items as MenuItem[])[(this.items as MenuItem[]).length - 1];
  // }

}
