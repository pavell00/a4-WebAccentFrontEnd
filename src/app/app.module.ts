import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { CalendarModule, DataTableModule,
        ToolbarModule, SplitButtonModule, DialogModule,
        InputSwitchModule, DropdownModule, CheckboxModule, 
        RadioButtonModule, MenubarModule } from 'primeng/primeng';
//interface main window
import { WelcomeComponent, RootComponent, FolderComponent,
        DocumentComponent, JournalComponent, EditDialogComponent,
        BreadCramberComponent, ProfileComponent, TypeSelectorComponent,
        HomeComponent, InnerComponent, CalendarDlgComponent,
        CallbackComponent} from './components';
//interface main form
import { AgentSelectorComponent, BinderSelectorComponent,
        DocNoDateComponent, MainFormComponent,
        PriceListComponent, SearchEntityComponent,
        TableEntityComponent, TemplateSelectorComponent
        } from './components/main-form.components/';

import { AppService } from './services/app.service';
import { MainformService } from './services/main-form.service';
import {Auth} from './services/auth0.service';
import {AuthGuard} from './auth.guard';

import { Logger } from "angular2-logger/core";
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
                  CalendarModule, DataTableModule, MenubarModule,
                  ToolbarModule, SplitButtonModule, DialogModule, DropdownModule,
                  InputSwitchModule, CheckboxModule, RadioButtonModule],
  declarations: [ 
                  RootComponent, JournalComponent,
                  DocumentComponent, FolderComponent,
                  EditDialogComponent, BreadCramberComponent, WelcomeComponent,
                  ProfileComponent,
                  HomeComponent, CallbackComponent,
                  TypeSelectorComponent, InnerComponent, CalendarDlgComponent,
                  //main-form
                  AgentSelectorComponent, BinderSelectorComponent,
                  DocNoDateComponent, MainFormComponent,
                  PriceListComponent, SearchEntityComponent,
                  TableEntityComponent, TemplateSelectorComponent
                ],
  providers:    [ AppService, appRoutingProviders,
                  Auth, AuthGuard, Logger,
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
