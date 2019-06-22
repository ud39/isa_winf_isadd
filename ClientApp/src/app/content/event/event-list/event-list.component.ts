import { Component, OnInit } from '@angular/core';
import {EventService} from "../../../services/event/event.service";
import {Event } from "../../../interfaces/entity/Event";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  private events : Event[];
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(value => {
      this.events = value;
      console.log(value);
    },error1 => console.log(error1))
  }

}
