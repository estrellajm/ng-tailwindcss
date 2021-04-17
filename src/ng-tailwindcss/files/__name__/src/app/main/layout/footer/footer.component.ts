import { Component, OnInit } from '@angular/core';
import { Navigation } from 'src/app/app.navigation';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  nav = Navigation
  constructor() {}

  ngOnInit(): void {}
}
