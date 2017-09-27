import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HighlightDirective } from './directives/highlight';

import { RouteModule } from './route.module';

import { DemoComponent } from './demo.component';
import { MenuComponent } from './components/menu.component';
import { HomeModule } from './components/home/index.module';
import { QuickstartModule } from './components/quickstart/index.module';

@NgModule({
    imports: [
        BrowserModule,
        RouteModule,
        HomeModule,
        QuickstartModule
    ],
    declarations: [
        DemoComponent,
        MenuComponent,
        HighlightDirective
    ],
    bootstrap: [DemoComponent]
})
export class DemoModule { }
