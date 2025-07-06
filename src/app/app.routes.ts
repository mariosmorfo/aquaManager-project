import { Routes } from '@angular/router';
import { CageManagement } from './components/cage-management/cage-management';
import { FishStocking } from './components/fish-stocking/fish-stocking';
import { MortalityRegistration } from './components/mortality-registration/mortality-registration';

export const routes: Routes = [

  {path:'cage-management', component: CageManagement},
  {path: 'fish-stocking', component: FishStocking},
  {path: 'mortality-registration', component: MortalityRegistration}
];
