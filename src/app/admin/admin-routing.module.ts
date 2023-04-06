import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  //{path: 'main', component: AdminComponent}, //Auth Guards özelliğinden önce böyle idi
  {path: 'main', component: AdminComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: 'auth'} //yukarıdakiler hariç bir url girilirse : path'i auth'a yönlendir.
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
