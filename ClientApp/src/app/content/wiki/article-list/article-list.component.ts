import { Component, OnInit } from '@angular/core';
import {Equipment} from "../../../interfaces/entity/Equipment";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  public equipments: Equipment[];
  constructor() { }

  ngOnInit() {
  }

}
