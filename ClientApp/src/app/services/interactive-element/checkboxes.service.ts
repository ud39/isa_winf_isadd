import {Injectable, QueryList} from '@angular/core';
import {MatCheckbox, MatInput, MatSelect} from "@angular/material";
import {FormGroup} from "@angular/forms";
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

  public fillOutWlan(fg : FormGroup,wlan: boolean){
    if(wlan){fg.get('wlan').setValue(true);}
    if(wlan == false){fg.get('wlan').setValue(false);}
  }
  public fillOutLatteArt(fg : FormGroup,latteArt: boolean){
    if(latteArt){fg.get('latteArt').setValue(true);}
    if(latteArt == false){fg.get('latteArt').setValue(false);}
  }
  public fillOutOutdoor(fg : FormGroup,outdoor: boolean){
    console.log("Fill outdoor");
    if(outdoor){fg.get('outdoor').setValue(true);}
    if(outdoor == false){
      console.log(outdoor);
      fg.get('outdoor').setValue(false);
    }
  }
  public fillOutChildFriendly(fg : FormGroup,childFriendly: boolean){
    if(childFriendly){fg.get('childFriendly').setValue(true);}
    if(childFriendly == false){fg.get('childFriendly').setValue(false);}
  }
  public fillOutWorkStation(fg : FormGroup,workstation: boolean){
    if(workstation){fg.get('workstation').setValue(true);}
    if(workstation == false){fg.get('workstation').setValue(false);}
  }
  public fillOutShop(fg : FormGroup,shop: boolean){
    if(shop){fg.get('shop').setValue(true);}
    if(shop == false){fg.get('shop').setValue(false);}
  }
  public fillOutDisableFriendly(fg : FormGroup,disableFriendly: boolean){
    if(disableFriendly){fg.get('disableFriendly').setValue(true);}
    if(disableFriendly == false){fg.get('disableFriendly').setValue(false);}
  }
  public fillOutPetFriendly(fg : FormGroup,petFriendly: boolean){
    if(petFriendly){fg.get('petFriendly').setValue(true);}
    if(petFriendly == false){fg.get('petFriendly').setValue(false);}
  }
  public fillOutWarmFood(fg : FormGroup,warmFood: boolean){
    if(warmFood){fg.get('warmFood').setValue(true);}
    if(warmFood == false){fg.get('warmFood').setValue(false);}
  }
  public fillOutColdFood(fg : FormGroup,coldFood: boolean){
    if(coldFood){fg.get('coldFood').setValue(true);}
    if(coldFood == false){fg.get('coldFood').setValue(false);}
  }
  public fillOutFranchise(fg : FormGroup,franchise: boolean){
    if(franchise){fg.get('franchise').setValue(true);}
    if(franchise == false){fg.get('franchise').setValue(false);}
  }
  fillOutCheckBoxes(shop: Shop, cb : FormGroup){
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
