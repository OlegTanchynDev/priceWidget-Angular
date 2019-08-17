import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, FooterComponent } from './components';
import { RouterModule } from '@angular/router';
import { CopyDirective } from './directives/copy.directive';
import { ScriptLoaderService } from './services/script-loader.service';
import { ScrollToDirective } from './directives/scroll-to.directive';
import { NumberOnlyDirective } from './directives/number-only.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HeaderComponent, FooterComponent, CopyDirective, ScrollToDirective, NumberOnlyDirective],
  providers: [ScriptLoaderService],
  exports: [HeaderComponent, FooterComponent, CopyDirective, ScrollToDirective, NumberOnlyDirective]
})
export class SharedModule { }
