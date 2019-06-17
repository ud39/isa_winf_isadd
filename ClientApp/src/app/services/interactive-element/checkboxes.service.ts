import {Injectable, QueryList} from '@angular/core';
import {MatCheckbox, MatSelect} from "@angular/material";
import {FormControl, FormControlName} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CheckBoxesService {
   private jsonOfSearchParameters = {
   };

    _filter(value: string, options): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

    getInputValue(formControl : FormControl):void{
      this.jsonOfSearchParameters['shop_name'] = {
        values: formControl.value
      };
    }

    getCheckBoxesValues(cbs: Array<MatCheckbox>):void{
      for(let cb of cbs){
        this.jsonOfSearchParameters[cb.id] = {
          values: cb.checked,
        };
      }
    }

    getSelectValue(selects : Array<MatSelect>):void{
      for(let select of selects){
        this.jsonOfSearchParameters[select.id] ={
          values: select.value
        };
      }
    }

  getjsonOfSearch(formControl : FormControl, cbs: Array<MatCheckbox>) : JSON{
      this.getInputValue(formControl);
      this.getCheckBoxesValues(cbs);
      return <JSON> this.jsonOfSearchParameters;
    }

  getjsonOfSearchWithSelect(formControl : FormControl, cbs: Array<MatCheckbox>, select: Array<MatSelect>) : JSON{
    this.getInputValue(formControl);
    this.getCheckBoxesValues(cbs);
    this.getSelectValue(select);
    return <JSON> this.jsonOfSearchParameters;
  }


  unselectCheckBoxes(cbs : QueryList<MatCheckbox>){
    let array: MatCheckbox [] = cbs.toArray();
    array.forEach(function (value){
      if(value.checked == true){
        value.toggle();
      }
    }, error => console.log(error));
  }

  resetInput(formControl: FormControl){
    formControl.reset();
  }

  resetSelect(selects : Array<MatSelect>){
      for(let select of selects){
        select.writeValue("");
      }
  }

  clear(cbs : QueryList<MatCheckbox>, formControl: FormControl, select : Array<MatSelect>){
      this.unselectCheckBoxes(cbs);
      this.resetInput(formControl);
      this.resetSelect(select);
  }

  constructor() { }
}
