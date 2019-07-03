import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Event} from "../../../interfaces/entity/Event";
import {switchMap} from "rxjs/operators";
import {EventService} from "../../../services/event/event.service";

@Component({
  selector: 'app-event-detailed',
  templateUrl: './event-detailed.component.html',
  styleUrls: ['./event-detailed.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventDetailedComponent implements OnInit {

  public event$: Event;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: EventService,) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.service.getEvent(params.get('id')))
    ).subscribe((params:Event) =>{
      this.event$ = params;
    })
  }

}
