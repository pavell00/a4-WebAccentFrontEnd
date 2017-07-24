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
        InputSwitchModule, DropdownModule, CheckboxModule, RadioButtonModule } from 'primeng/primeng';

import { WelcomeComponent } from './components/welcome.component/welcome.component';
import { RootComponent } from './components/root.component/root.component';
import { FolderComponent } from './components/folder.component/forlder.component';
import { DocumentComponent } from './components/document.component/document.component';
import { JournalComponent } from './components/journal.component/journal.component';
import { CalendarComponent } from './components/calendar.component/calendar.component';
import { AutoComplitEntityComponent }  from './components/autocomplit.entity.component/autocomplit.entity.component';
import { EditDialogComponent } from './components/edit.dialog.component/edit.dialog.component';
import { BreadCramberComponent } from './components/breadcramber.component/breadcramber.component';
import { ProfileComponent } from './components/profile.component/profile.component';
import { TypeSelectorComponent } from './components/type-selector.component/type-selector.component';
import { HomeComponent } from './components/home.componet/home.component';
import {InnerComponent} from './components/inner.component/inner.component';
import { CalendarDlgComponent } from './components/calendar-dlg.component/calendar-dlg.component';
import {CallbackComponent} from './components/callback.component/callback.component';

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
                  HttpModule,
                  FormsModule,
                  JsonpModule,
                  CalendarModule, DataTableModule, AutoCompleteModule,
                  ToolbarModule, SplitButtonModule, DialogModule, DropdownModule,
                  InputSwitchModule, CheckboxModule, RadioButtonModule],
  declarations: [ 
                  RootComponent, JournalComponent,
                  DocumentComponent, FolderComponent,
                  CalendarComponent, AutoComplitEntityComponent,
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
