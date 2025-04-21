import { Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { PageComponent } from './components/page/page.component';

export const routes: Routes = [
    {
        path: window.JTA_CONFIG.url.toLowerCase() + '/page/:pageIndex', component: PageComponent
    },
    {
        path: '', redirectTo: window.JTA_CONFIG.url.toLowerCase() + '/page/1', pathMatch: 'full'
    },
    {
        // path: '**', component: PageComponent
        path: '**', redirectTo: window.JTA_CONFIG.url.toLowerCase() + '/page/1', pathMatch: 'full'
    }
];
