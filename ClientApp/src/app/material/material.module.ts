import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule,MatSlideToggleModule,MatButtonModule, MatCheckboxModule,
        MatInputModule, MatTabsModule, MatFormFieldModule, MatMenuTrigger,
        MatMenuModule, MatGridListModule, MatIconModule,
        MatSidenavModule, MatSliderModule,MatSelectModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule } from "@angular/material";
import { MatToolbarModule, MatListModule } from '@angular/material';
import {CheckboxComponent} from "../search/checkbox/checkbox.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CheckboxEquipmentComponent} from "../search/checkbox-equipment/checkbox-equipment.component";


@NgModule({
  declarations: [CheckboxComponent, CheckboxEquipmentComponent],
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
    MatSelectModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatListModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatNativeDateModule
  ],
  exports:[
    CheckboxComponent,
    CheckboxEquipmentComponent,
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
    MatSelectModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatListModule,
    MatDatepickerModule,
    MatMenuTrigger,
    MatNativeDateModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }
