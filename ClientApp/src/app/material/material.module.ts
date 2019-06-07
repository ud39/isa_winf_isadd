import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule,MatButtonModule, MatCheckboxModule, MatInputModule, MatTabsModule, MatFormFieldModule, MatMenuModule, MatGridListModule, MatIconModule, MatSidenavModule, MatSliderModule } from "@angular/material";
import { MatToolbarModule, MatListModule } from '@angular/material';
import {CheckboxComponent} from "../search/checkbox/checkbox.component";


@NgModule({
  declarations: [CheckboxComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  exports:[
    CheckboxComponent,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class MaterialModule { }
