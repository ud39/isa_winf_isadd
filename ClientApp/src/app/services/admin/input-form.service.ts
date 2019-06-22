import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class InputFormService {

  public getValues(contentFormGroup: FormGroup){
    return contentFormGroup;
  }

  constructor() { }
}
