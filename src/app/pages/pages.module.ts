import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages.routing.module';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent, EditComponent, MainComponent } from './components';
import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    WidgetsModule
  ],
  declarations: [HomeComponent, EditComponent, MainComponent]
})
export class PagesModule { }
