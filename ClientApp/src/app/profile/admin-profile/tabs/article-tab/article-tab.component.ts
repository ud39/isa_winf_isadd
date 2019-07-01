import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-article-tab',
  templateUrl: './article-tab.component.html',
  styleUrls: ['./article-tab.component.css']
})
export class ArticleTabComponent implements OnInit {

  constructor() { }

  public   content = [
    {value: 'Blend', viewValue: 'Blend'},
    {value: 'Bean', viewValue: 'Bohnen'},
    {value: 'Equipment', viewValue: 'Equipment'},
    {value: 'CoffeeDrink', viewValue: 'KaffeeDrink'},
    {value: 'Equipment-category', viewValue: 'Equipment Kategorie'},
  ];
  public articleTitleFormControl = new FormControl('',[
    Validators.required
  ]);
  public articleExposeFormControl  = new FormControl('',[]);

  public articleGroupFormControl = new FormGroup({
    title : this.articleTitleFormControl,
    expose : this.articleExposeFormControl
  });

  getJsonOfArticle():JSON{
    return null;
  }

  getArticleInput():FormGroup{
    return this.articleGroupFormControl
  }

  ngOnInit() {
  }

}
