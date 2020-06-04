import { Injectable } from '@angular/core';
import { Element } from '@angular/compiler';
import { Observable, of } from 'rxjs';
import { ELEMENT } from './mock-element';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor() {}

  // TODO bien sur faire une vraie requete, il faudra ^
  getElements() {
    return of(ELEMENT);
  }
}
