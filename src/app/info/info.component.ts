import { Component } from '@angular/core';

import { faUserPlus, faFileAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'alx-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  constructor() {}
  Register = faUserPlus;
  Git = faFileAlt;
}
