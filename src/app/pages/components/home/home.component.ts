import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  /*
* @todo change link to periodic price
*/


  ngOnInit() {
    this.autoScroll();
  }

  autoScroll() {
    const height = sessionStorage.getItem('scrollHeight');
    if (height) window.scrollTo(0, +height);
  }

  getScrollPos() {
    const scrollHeight = window.pageYOffset + '';
    sessionStorage.setItem('scrollHeight', scrollHeight);
  }

}

