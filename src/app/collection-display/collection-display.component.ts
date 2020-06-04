import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../core/services/collection.service';
import { Element } from './element/Element';

@Component({
  selector: 'alx-collection-display',
  templateUrl: './collection-display.component.html',
  styleUrls: ['./collection-display.component.scss'],
})
export class CollectionDisplayComponent implements OnInit {
  title = 'Collection display component';
  elements: Element[];

  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {
    this.getCollection();
  }

  private getCollection() {
    this.collectionService
      .getElements()
      .subscribe((elem) => (this.elements = elem));
  }
}
