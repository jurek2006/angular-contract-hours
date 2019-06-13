import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";

const matModules = [
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserAnimationsModule, ...matModules],
  exports: [...matModules]
})
export class MaterialModule {}
