import { Injectable } from '@angular/core';
import { Element } from '@angular/compiler';
import { Observable } from 'rxjs';
import { ELEMENT } from './mock-element';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor() {}

  getCollection() {
    return ELEMENT;
  }
}
