import { Routes } from '@angular/router';
import { DesktopComponent } from './components/desktop.component';
import { ComputerComponent } from './components/computer/computer.component';
import { TerminalComponent } from './components/computer/terminal/terminal.component';

export const routes: Routes = [
    {
        path: '',
        component: DesktopComponent,
    },
    {
        path: 'computer',
        component: TerminalComponent
    }
];
