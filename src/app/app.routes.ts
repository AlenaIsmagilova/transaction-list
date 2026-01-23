import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';
import { SummaryComponent } from './summary/summary.component';
import { MainInfoComponent } from './main-info/main-info.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'about',
        component: MainInfoComponent,
      },
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'summary',
        component: SummaryComponent,
      },
    ],
  },
];
