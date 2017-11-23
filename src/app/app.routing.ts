import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WelcomeComponent, RootComponent,
        ProfileComponent, HomeComponent,
        CallbackComponent, ReportListComponent} from './components';

import {AuthGuard} from './auth.guard';

const appRoutes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    }, {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'accountapp',
        component: RootComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'callback', component: CallbackComponent 
    }, {
        path: '**', redirectTo: ''
    }, {
        path: 'compose',
        component: ReportListComponent,
        outlet: 'popup'
      },
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
