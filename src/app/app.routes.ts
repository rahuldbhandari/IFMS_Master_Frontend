import { Routes } from '@angular/router';
import { MajorheadsListComponent } from './Components/majorheads-list/majorheads-list.component';
import { MajorheadsFormComponent } from './Components/majorheads-form/majorheads-form.component';

export const routes: Routes = [
    { path: "majorheads-list", component: MajorheadsListComponent },
    { path: "majorheads-form", component: MajorheadsFormComponent },
    { path: "majorheads-form/:id", component: MajorheadsFormComponent },
];
