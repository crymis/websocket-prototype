import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishesComponent } from './dishes/dishes.component';
import { ClientScreenComponent } from './client/client-screen/client-screen.component';
import { OverviewComponent } from './overview/overview.component';
import { AdminScreenComponent } from './admin/admin-screen/admin-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    ClientScreenComponent,
    AdminScreenComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
