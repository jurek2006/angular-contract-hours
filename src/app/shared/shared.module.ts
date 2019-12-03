import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { AppDisableControlDirective } from './app-disable-control.directive';
import { UiSpinnerComponent } from './ui-spinner.component';

const importExportModules = [CommonModule, MaterialModule];

@NgModule({
  declarations: [AppDisableControlDirective, UiSpinnerComponent],
  imports: [...importExportModules],
  exports: [
    ...importExportModules,
    AppDisableControlDirective,
    UiSpinnerComponent
  ]
})
export class SharedModule {}
