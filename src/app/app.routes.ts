import { Routes } from '@angular/router';
import { DetailListComponent } from './Components/detailheal-list/detailheal-list.component';
import { DetailheadFormComponent } from './Components/detailhead-form/detailhead-form.component';
import { SubdetailheadListComponent } from './Components/subdetailhead-list/SubdetailheadListComponent';

import { SubdetailFormComponent } from './Components/subdetailhead-form/subdetail-form.component';


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
    {
        path: "subdetailhead-list",
        component: SubdetailheadListComponent
    },
    {
        path: "create-subdetailhead/:id",
        component: SubdetailFormComponent
    },
    {
        path: "Add-subdetailhead",
        component: SubdetailFormComponent
    },
    
    
    

];
