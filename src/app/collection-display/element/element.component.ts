import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'alx-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent implements OnInit {
  name = 'element 1';
  constructor() {}

  ngOnInit(): void {}
}
