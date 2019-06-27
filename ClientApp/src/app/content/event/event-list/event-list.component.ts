import { Component, OnInit } from '@angular/core';
import {EventService} from "../../../services/event/event.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {


  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(value => {
      this.eventService.events = value;
    },error1 => console.log(error1))
  }

}
