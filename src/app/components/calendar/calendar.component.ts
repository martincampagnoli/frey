import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed/feed.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

  mFeed: Array<any> = [];
  newComment: Array<any> = [];
  currentUser: any;
  //get event data from firebase
  calendarEvents = [
    { title: 'event 1', date: '2021-03-28' }
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    //dateClick: this.handleDateClick.bind(this), // bind is important!
    events: this.calendarEvents,
  };


  handleDateClick: any;


  constructor(private feedService: FeedService, private authService: AuthService) {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  dateClick() {
    alert("test");
  }

  addEvent() {
    this.calendarEvents.push(
      { title: 'event 3', date: '2021-04-01' }
    );
  }

  modifyTitle(eventIndex, newTitle) {
    this.calendarEvents[eventIndex].title = newTitle;
  }

  ngOnInit(): void {
    this.feedService.getFeed().subscribe(f => {
      f = f.filter(e =>  !this.containsObject(e, this.mFeed) );

      f.forEach((v, i) => {
        setTimeout(() => {
          this.mFeed.push(v);
        }, i * 2000);
      });

    });
  }

  containsObject(obj, list): boolean {
    return list.filter( e => e.uid === obj.uid).length > 0;
  }

}
