import {Injectable, QueryList} from '@angular/core';
import {MatCheckbox, MatInput, MatSelect} from "@angular/material";
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class CheckBoxesService {
  public jsonOfSearchParameters = {
  };

  public _filter(value: string, options): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  public getFormControlValue(formControls : Array<FormControl>):void{
    for(let formControl of formControls){
      this.jsonOfSearchParameters[formControl.value] = formControl.value
    }
  }

  public getCheckBoxesValues(cbs: Array<MatCheckbox>):void{
    for(let cb of cbs){
      this.jsonOfSearchParameters[cb.id] = cb.checked
    }
  }

  public getSelectValue(selects : Array<MatSelect>):void {
    for (let select of selects) {
      this.jsonOfSearchParameters[select.id] = select.value
    }
  }

  public getInputValue(inputs : Array<MatInput>):void{
    for(let input of inputs){
      this.jsonOfSearchParameters[input.id] = input.value
    }
  }

  public getAddressInputValues(inputs : Array<MatInput>): void {
    this.jsonOfSearchParameters['address'] = {};
    for(let input of inputs) {
      this.jsonOfSearchParameters['address'][input.id] = input.value;
    }
  }

  public getjsonOfSearch(formControls : Array<FormControl>, cbs: Array<MatCheckbox>) : JSON{
    this.getFormControlValue(formControls);
    this.getCheckBoxesValues(cbs);
    return <JSON> this.jsonOfSearchParameters;
  }

  public getjsonOfSearchWithSelect(inputs : Array<MatInput>, cbs: Array<MatCheckbox>, selects: Array<MatSelect>) : JSON{
    this.getInputValue(inputs);
    this.getCheckBoxesValues(cbs);
    this.getSelectValue(selects);
    return <JSON> this.jsonOfSearchParameters;
  }

  public getJsonOfShopInput(addressInputs: Array<MatInput>, inputs: Array<MatInput>, cbs: Array<MatCheckbox>, selects: Array<MatSelect>) : JSON {
    this.getAddressInputValues(addressInputs);
    this.getCheckBoxesValues(cbs);
    this.getSelectValue(selects);
    this.getInputValue(inputs);
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
