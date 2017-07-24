import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';

//import { AppData } from './data/app.data';
//import {AUTH_PROVIDERS} from 'angular2-jwt';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { CalendarModule, DataTableModule, AutoCompleteModule,
        ToolbarModule, SplitButtonModule, DialogModule,
        InputSwitchModule, DropdownModule, CheckboxModule, 
        RadioButtonModule } from 'primeng/primeng';

import { WelcomeComponent, RootComponent, FolderComponent,
        DocumentComponent, JournalComponent, EditDialogComponent,
        BreadCramberComponent, ProfileComponent, TypeSelectorComponent,
        HomeComponent, InnerComponent, CalendarDlgComponent,
        CallbackComponent} from './components';

import { AppService } from './services/app.service';
import {Auth} from './services/auth0.service';
import {AuthGuard} from './auth.guard';

import { Headers, Http, RequestOptions } from '@angular/http';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}

@NgModule({
  imports:      [ BrowserModule, routing,
                  BrowserAnimationsModule,
                  HttpModule, FormsModule, JsonpModule,
                  CalendarModule, DataTableModule, AutoCompleteModule,
                  ToolbarModule, SplitButtonModule, DialogModule, DropdownModule,
                  InputSwitchModule, CheckboxModule, RadioButtonModule],
  declarations: [ 
                  RootComponent, JournalComponent,
                  DocumentComponent, FolderComponent,
                  EditDialogComponent, BreadCramberComponent, WelcomeComponent,
                  ProfileComponent,
                  HomeComponent, CallbackComponent,
                  TypeSelectorComponent, InnerComponent, CalendarDlgComponent
                ],
  providers:    [ AppService, appRoutingProviders,
                  Auth, AuthGuard,
                  {
                    provide: AuthHttp,
                    useFactory: authHttpServiceFactory,
                    deps: [Http, RequestOptions]
                  }
                ],                  
  bootstrap:    [ WelcomeComponent ],
  entryComponents: [InnerComponent]
})
export class AppModule { }
