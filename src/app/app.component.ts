import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MajorheadsListComponent } from './Components/majorheads-list/majorheads-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, ToolbarModule, RouterLink, MajorheadsListComponent, RouterModule],
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
}
