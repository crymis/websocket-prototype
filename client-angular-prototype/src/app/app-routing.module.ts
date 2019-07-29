import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DishesComponent } from './dishes/dishes.component';
import { AdminScreenComponent } from './admin/admin-screen/admin-screen.component';
import { ClientScreenComponent } from './client/client-screen/client-screen.component';
import { OverviewComponent } from './overview/overview.component';


const routes: Routes = [
  { path: '', redirectTo: '/client', pathMatch: 'full' },
  { path: 'client', component: ClientScreenComponent },
  { path: 'admin', component: AdminScreenComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'dishes', component: DishesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
