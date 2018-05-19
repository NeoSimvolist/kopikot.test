import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

import {ApiService} from './api.service';

import {AppComponent} from './app.component';
import {HomepageComponent} from './homepage/homepage.component';
import {EventPageComponent} from './event-page/event-page.component';
import {PopupComponent} from './popup/popup.component';


@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        EventPageComponent,
        PopupComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [
        ApiService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
