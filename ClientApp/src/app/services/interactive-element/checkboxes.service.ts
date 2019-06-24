import {Injectable, QueryList} from '@angular/core';
import {MatCheckbox, MatSelect} from "@angular/material";
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CheckBoxesService {
   private jsonOfSearchParameters = {
   };

    public _filter(value: string, options): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

    public getInputValue(formControls : Array<FormControl>):void{
      for(let formControl of formControls){
        this.jsonOfSearchParameters[formControl.value] = {
          values: formControl.value
        };
      }
    }

    public getCheckBoxesValues(cbs: Array<MatCheckbox>):void{
      for(let cb of cbs){
        this.jsonOfSearchParameters[cb.id] = {
          values: cb.checked,
        };
      }
    }

    public getSelectValue(selects : Array<MatSelect>):void{
      for(let select of selects){
        this.jsonOfSearchParameters[select.id] ={
          values: select.value
        };
      }
    }

  public getjsonOfSearch(formControls : Array<FormControl>, cbs: Array<MatCheckbox>) : JSON{
      this.getInputValue(formControls);
      this.getCheckBoxesValues(cbs);
      return <JSON> this.jsonOfSearchParameters;
    }

  public getjsonOfSearchWithSelect(formControls : Array<FormControl>, cbs: Array<MatCheckbox>, select: Array<MatSelect>) : JSON{
    this.getInputValue(formControls);
    this.getCheckBoxesValues(cbs);
    this.getSelectValue(select);
    return <JSON> this.jsonOfSearchParameters;
  }


  public unselectCheckBoxes(cbs : QueryList<MatCheckbox>){
    let array: MatCheckbox [] = cbs.toArray();
    array.forEach(function (value){
      if(value.checked == true){
        value.toggle();
      }
    }, error => console.log(error));
  }

  public resetInputs(formControls: Array<FormControl>){
    for(let formoContorl of formControls){
      formoContorl.reset();
    }
  }

  public resetSelect(selects : Array<MatSelect>){
      for(let select of selects){
        select.writeValue("");
      }
  }

  public clear(cbs : QueryList<MatCheckbox>, formControls: Array<FormControl>, select : Array<MatSelect>){
      this.unselectCheckBoxes(cbs);
      this.resetInputs(formControls);
      this.resetSelect(select);
  }

  constructor() { }
}
