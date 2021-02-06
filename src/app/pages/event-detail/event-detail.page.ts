import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  eventId = null;
  event: any;
  urlPicture = 'http://127.0.0.1:8887/';
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('eventid');
  }
  ionViewWillEnter() {
    this.handleLoadEvent();

  }

  handleLoadEvent() {

    this.api.get('event/' + this.eventId).toPromise().then((res) => {
      this.event = res;
    });
  }

}
