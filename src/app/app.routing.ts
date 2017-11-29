import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WelcomeComponent, RootComponent,
        ProfileComponent, HomeComponent,
        CallbackComponent, AdminPanelComponent } from './components'; //ReportListComponent

import {AuthGuard} from './auth.guard';
import {AdminGuard} from './admin.guard';

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
        path: 'adminpanel',
        component: AdminPanelComponent,
        canActivate: [AdminGuard]
    }, {
        path: '**', redirectTo: ''
    }
    /* , {
        path: 'compose',
        component: ReportListComponent,
        outlet: 'popup'
      }, */
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
