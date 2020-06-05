import { Component, OnInit } from '@angular/core';
import { Element } from './element/Element';
import { ApiService } from '../core/services';

@Component({
  selector: 'alx-collection-display',
  templateUrl: './collection-display.component.html',
  styleUrls: ['./collection-display.component.scss'],
})
export class CollectionDisplayComponent implements OnInit {
  title = 'Media Collection List';
  elements: Element[];
  noPicture: true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getCollection();
  }

  private getCollection() {
    this.apiService
      .getElements('/public/medias')
      .subscribe((elem) => (this.elements = elem));
  }
}
