import {Injectable, QueryList} from '@angular/core';
import {MatCheckbox} from "@angular/material";
import {FormControl, FormControlName} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CheckBoxesService {
   public jsonOfSearchParameters = {
   };

    _filter(value: string, options): string[] {
    const filterValue = value.toLowerCase();

    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
    getInputValue(formControl : FormControl){
      this.jsonOfSearchParameters['input'] = {
        values: formControl.value
      };
      return formControl.value;
    }
    getCheckBoxesValues(cbs: Array<MatCheckbox>) : JSON {

      for(let cb of cbs){
        this.jsonOfSearchParameters[cb.id] = {
          values: cb.checked,
        };
      }
      return <JSON> this.jsonOfSearchParameters;
    }

    get jsonOfSearch() : JSON{
      return <JSON> this.jsonOfSearchParameters;
    }



   unselectCheckBoxes(cbs : QueryList<MatCheckbox>, formControl: FormControl){
    let array: MatCheckbox [] = cbs.toArray();
    array.forEach(function (value){
      if(value.checked == true){
        value.toggle();
      }
    }, error => console.log(error));
    formControl.reset();
  }
  constructor() { }
}
