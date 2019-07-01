import {Injectable, QueryList} from '@angular/core';
import {MatCheckbox, MatInput, MatSelect} from "@angular/material";
import {FormControl, FormGroup} from "@angular/forms";
import {Shop} from "../../interfaces/entity/Shop";

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

  public getCheckBoxesValues(cbs: Array<MatCheckbox>):void{for(let cb of cbs){
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
    console.log(this.jsonOfSearchParameters);
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

  fillOutWlan(cb : Array<MatCheckbox>,wlan: boolean){
    if(wlan) {return cb.find(val => val.id == 'wlan').checked = true;}
  }
  fillOutVegan(cb : Array<MatCheckbox>,vegan: boolean){
    if(vegan) {return cb.find(val => val.id == 'vegan').checked = true;}
  }
  fillOutLatteArt(cb : Array<MatCheckbox>,latteArt: boolean){
    if(latteArt) {return cb.find(val => val.id == 'latteArt').checked = true;}
  }
  fillOutOutdoor(cb : Array<MatCheckbox>,outdoor: boolean){
    if(outdoor) {return cb.find(val => val.id == 'outdoor').checked = true;}
  }
  fillOutChildFriendly(cb : Array<MatCheckbox>,childfiendly: boolean){
    if(childfiendly) {return cb.find(val => val.id == 'childFriendly').checked = true;}
  }
  fillOutWorkStation(cb : Array<MatCheckbox>,workstation: boolean){
    if(workstation) {return cb.find(val => val.id == 'workstation').checked = true;}
  }
  fillOutShop(cb : Array<MatCheckbox>,shop: boolean){
    if(shop) {return cb.find(val => val.id == 'shop').checked = true;}
  }
  fillOutDisableFriendly(cb : Array<MatCheckbox>,disableFriendly: boolean){
    if(disableFriendly) {return cb.find(val => val.id == 'disableFriendly').checked = true;}
  }
  fillOutPetFriendly(cb : Array<MatCheckbox>,petFriendly: boolean){
    if(petFriendly) {return cb.find(val => val.id == 'petFriendly').checked = true;}
  }
  fillOutWarmFood(cb : Array<MatCheckbox>,warmFood: boolean){
    if(warmFood) {return cb.find(val => val.id == 'warmFood').checked = true;}
  }
  fillOutColdFood(cb : Array<MatCheckbox>,coldFood: boolean){
    if(coldFood) {return cb.find(val => val.id == 'coldFood').checked = true;}
  }
  fillOutFranchise(cb : Array<MatCheckbox>,franchise: boolean){
    if(franchise) {return cb.find(val => val.id == 'wlan').checked = true;}
  }
  fillOutCheckBoxes(shop: Shop, cb : Array<MatCheckbox>){
    this.fillOutWlan(cb,shop.wlan);
    this.fillOutWarmFood(cb,shop.warmFood);
    this.fillOutColdFood(cb,shop.coldFood);
    this.fillOutChildFriendly(cb,shop.childFriendly);
    this.fillOutLatteArt(cb,shop.latteArt);
    this.fillOutFranchise(cb,shop.franchise);
    this.fillOutPetFriendly(cb,shop.petsFriendly);
    this.fillOutDisableFriendly(cb,shop.disabledFriendly);
    this.fillOutWorkStation(cb,shop.workstation);
    this.fillOutOutdoor(cb,shop.outdoor);
  }
  constructor() { }
}
