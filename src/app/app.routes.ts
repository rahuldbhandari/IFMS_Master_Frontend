import { Routes } from '@angular/router';
import { TreasuryListComponent } from './Components/treasury-list/treasury-list.component';
import { TreasuryFormComponent } from './Components/treasury-form/treasury-form.component';

export const routes: Routes = [
    {path:"treasury-list", component:TreasuryListComponent},
    {path:"treasury-form", component:TreasuryFormComponent},
];
