import { Routes } from '@angular/router';
import { DetailListComponent } from './Components/detailheal-list/detailheal-list.component';
import { DetailheadFormComponent } from './Components/detailhead-form/detailhead-form.component';


export const routes: Routes = [
    {
        path: "",
        component: DetailListComponent
    },
    {
        path: "detailhead-list",
        component: DetailListComponent
    },
    {
        path: "create-detailhead/:id",
        component: DetailheadFormComponent
    },
    {
        path: "Add-DetailHead",
        component: DetailheadFormComponent
    },
  
];
