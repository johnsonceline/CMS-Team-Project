import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListPage } from './list.page';
import { DashboardPage } from '../dashboard/dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ListPage
  }
];

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // PopoverComponent,
    RouterModule.forChild(routes)
  ],
  declarations: [ListPage, DashboardPage],
  entryComponents: [DashboardPage]
})
export class ListPageModule {}
