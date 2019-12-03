import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { AppDisableControlDirective } from './app-disable-control.directive';

const importExportModules = [CommonModule, MaterialModule];

@NgModule({
  declarations: [AppDisableControlDirective],
  imports: [...importExportModules],
  exports: [...importExportModules, AppDisableControlDirective]
})
export class SharedModule {}
