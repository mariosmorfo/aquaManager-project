import { Routes } from '@angular/router';
import { CageManagement } from './components/cage-management/cage-management';
import { FishStocking } from './components/fish-stocking/fish-stocking';

export const routes: Routes = [

  {path:'cage-management', component: CageManagement},
  {path: 'fish-stocking', component: FishStocking}
];
