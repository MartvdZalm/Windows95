import { Routes } from '@angular/router';
import { ComputerComponent } from './components/computer/computer.component';
import { Windows95BootComponent } from './components/windows95/windows95-boot/windows95-boot.component';
import { Windows95Component } from './components/windows95/windows95.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { adminGuard } from './admin/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: Windows95Component,
  },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminPanelComponent, canActivate: [adminGuard] },
      { path: 'login', component: AdminLoginComponent },
    ],
  },
  {
    path: 'computer',
    component: ComputerComponent,
  },
  {
    path: 'boot',
    component: Windows95BootComponent,
  },
];
