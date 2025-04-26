import { Routes } from '@angular/router';
import { DesktopComponent } from './components/desktop.component';
import { ComputerComponent } from './components/computer/computer.component';

export const routes: Routes = [
    {
        path: '',
        component: DesktopComponent,
    },
    {
        path: 'computer',
        component: ComputerComponent
    }
];
