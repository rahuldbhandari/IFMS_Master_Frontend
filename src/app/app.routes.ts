import { Routes } from '@angular/router';
import { MajorheadsListComponent } from './Components/majorheads-list/majorheads-list.component';
import { MajorheadsFormComponent } from './Components/majorheads-form/majorheads-form.component';
import { SubmajorheadsListComponent } from './Components/submajorheads-list/submajorheads-list.component';
import { SubmajorheadsFormComponent } from './Components/submajorheads-form/submajorheads-form.component';
import { MinorheadsListComponent } from './Components/minorheads-list/minorheads-list.component';
import { MinorheadsFormComponent } from './Components/minorheads-form/minorheads-form.component';

export const routes: Routes = [
    { path: "majorheads-list", component: MajorheadsListComponent },
    { path: "majorheads-form", component: MajorheadsFormComponent },
    { path: "majorheads-form/:id", component: MajorheadsFormComponent },
    { path: "submajorheads-list", component: SubmajorheadsListComponent },
    { path: "submajorheads-form/:id", component: SubmajorheadsFormComponent },
    { path: "submajorheads-form", component: SubmajorheadsFormComponent },
    { path: "minorheads-list", component: MinorheadsListComponent },
    { path: "minorheads-form/:id", component: MinorheadsFormComponent },
    { path: "minorheads-form", component: MinorheadsFormComponent },
];
