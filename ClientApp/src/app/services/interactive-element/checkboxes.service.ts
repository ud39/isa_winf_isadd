import {Injectable, QueryList} from '@angular/core';
import {MatCheckbox, MatInput, MatSelect} from "@angular/material";
import {FormControl, FormGroup} from "@angular/forms";

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

  public getSelectsValue(selects : Array<MatSelect>):void {
    for (let select of selects) {
      this.jsonOfSearchParameters[select.id] = select.value
    }
  }

  public getInputsValue(inputs : Array<MatInput>):void{
    for(let input of inputs){
      this.jsonOfSearchParameters[input.id] = input.value
    }
  }

  public getAddressInputsValues(inputs : Array<MatInput>): void {
    this.jsonOfSearchParameters['address'] = {};
    for(let input of inputs) {
      this.jsonOfSearchParameters['address'][input.id] = input.value;
    }
  }

  public getJsonOfSearch(inputs : Array<MatInput>, cbs: Array<MatCheckbox>) : JSON{
    this.getInputsValue(inputs);
    this.getCheckBoxesValues(cbs);
    return <JSON> this.jsonOfSearchParameters;
  }

  public getJsonOfSearchWithSelect(inputs : Array<MatInput>, cbs: Array<MatCheckbox>, selects: Array<MatSelect>) : JSON{
    this.getInputsValue(inputs);
    this.getCheckBoxesValues(cbs);
    this.getSelectsValue(selects);
    return <JSON> this.jsonOfSearchParameters;
  }

  public getJsonOfShopInput(addressInputs: Array<MatInput>, inputs: Array<MatInput>, cbs: Array<MatCheckbox>, selects: Array<MatSelect>) : JSON {
    this.getAddressInputsValues(addressInputs);
    this.getCheckBoxesValues(cbs);
    this.getSelectsValue(selects);
    this.getInputsValue(inputs);
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

  public resetInputs(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).reset('')
    })
  }

  public resetSelect(selects : Array<MatSelect>){
    for(let select of selects){
      select.writeValue("");
    }
  }

  public clear(cbs : QueryList<MatCheckbox>, formGroup: FormGroup, select : Array<MatSelect>){
    this.unselectCheckBoxes(cbs);
    this.resetInputs(formGroup);
    this.resetSelect(select);
  }

  constructor() { }
}
