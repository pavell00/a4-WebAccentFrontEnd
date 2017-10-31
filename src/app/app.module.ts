import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { Headers, Http, RequestOptions } from '@angular/http';

//primeng
import { CalendarModule, DataTableModule, ContextMenuModule, MenuModule,
        ToolbarModule, SplitButtonModule, DialogModule,
        InputSwitchModule, DropdownModule, CheckboxModule, 
        RadioButtonModule, MenubarModule, AutoCompleteModule } from 'primeng/primeng';
//interface main window
import { WelcomeComponent, RootComponent, FolderComponent,
        DocumentComponent, JournalComponent, EditDialogComponent,
        BreadCramberComponent, ProfileComponent, TypeSelectorComponent,
        HomeComponent, InnerComponent, CalendarDlgComponent,
        CallbackComponent, CalendarComponent,
        AutoComplitEntityComponent, EditDialog2Component} from './components';
//interface main form
import { AgentSelectorComponent, BinderSelectorComponent,
        DocNoDateComponent, MainFormComponent,
        PriceListComponent, SearchEntityComponent,
        TableEntityComponent, TemplateSelectorComponent
        } from './components/main-form.components/';

import {DataTableModule as a2_DataTableModule} from "angular2-datatable";

//Services
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppService } from './services/app.service';
import { MainformService } from './services/main-form.service';
import { OperationService } from './services/operation.service';
import { Auth } from './services/auth0.service';
import { AuthGuard } from './auth.guard';
import { Logger } from 'angular2-logger/app/core/logger';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}

@NgModule({
  imports:      [ BrowserModule, routing,
                  BrowserAnimationsModule,
                  HttpModule, FormsModule, JsonpModule,
                  CalendarModule, DataTableModule, MenubarModule, AutoCompleteModule, MenuModule,
                  ToolbarModule, SplitButtonModule, DialogModule, DropdownModule, ContextMenuModule,
                  InputSwitchModule, CheckboxModule, RadioButtonModule, a2_DataTableModule
                  ],
  declarations: [ 
                  RootComponent, JournalComponent,
                  DocumentComponent, FolderComponent,
                  EditDialogComponent, BreadCramberComponent, WelcomeComponent,
                  ProfileComponent, CalendarComponent, AutoComplitEntityComponent,
                  HomeComponent, CallbackComponent,
                  TypeSelectorComponent, InnerComponent, CalendarDlgComponent,
                  //main-form
                  AgentSelectorComponent, BinderSelectorComponent,
                  DocNoDateComponent, MainFormComponent,
                  PriceListComponent, SearchEntityComponent,
                  TableEntityComponent, TemplateSelectorComponent, EditDialog2Component
                ],
  providers:    [ AppService, MainformService, appRoutingProviders, OperationService,
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
