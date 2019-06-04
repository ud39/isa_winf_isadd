import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopListComponent implements OnInit {

  public post : Post;

  constructor(http :HttpClient)

  {
    http.get<Post>('https://jsonplaceholder.typicode.com/posts/1').subscribe(result => {
      this.post = result;
    }, error1 => console.log(error1));
  }

  ngOnInit() {
  }

}

interface Post{
  userId: number,
  id: number,
  title: string,
  body: string
}

