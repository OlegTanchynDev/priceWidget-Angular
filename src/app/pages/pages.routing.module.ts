import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, EditComponent, MainComponent } from './components';

const routes: Routes = [
  { path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'edit/:type', component: EditComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule {}
