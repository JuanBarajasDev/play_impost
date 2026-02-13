import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';

import { TargetsPlayersComponent } from './targets-players/targets-players.component';

export const routes: Routes = [
    {path: 'main-page', component: MainPageComponent},
    {path: 'targets-players', component: TargetsPlayersComponent},
    {path: '', redirectTo: '/main-page', pathMatch: 'full' }
];
