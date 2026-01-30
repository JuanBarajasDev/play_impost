import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { FinishGameComponent } from './finish-game/finish-game.component';
import { TargetsPlayersComponent } from './targets-players/targets-players.component';

export const routes: Routes = [
    {path: 'main-page', component: MainPageComponent},
    {path: 'targets-players', component: TargetsPlayersComponent},
    {path: 'finish-game', component: FinishGameComponent},
    {path: '', redirectTo: '/main-page', pathMatch: 'full' }
];
