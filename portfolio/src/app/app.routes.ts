import { Routes } from '@angular/router';
import { Error404 } from './components/error404/error404';
import { Home } from './components/home/home';

export const routes: Routes = [
    { path: '', component: Home },
    { path: '404', component: Error404 },
    { path: '**', redirectTo: '/404' } // Qualsevol cosa que no existeixi, va a 404
];

