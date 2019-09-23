import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var window;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  window:any;
  constructor(public router:ActivatedRoute) { 
    this.window = window;
    console.log(this.router.url);
  }

  ngOnInit() {
  }

}
