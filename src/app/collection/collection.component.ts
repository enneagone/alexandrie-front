import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'alx-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  cards = [
    {
      title: 'Hunter x Hunter edition 9.5 Tom 123',
      description:
        'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img:
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg',
      Author: 'Author: Yoshihiro Togashi',
      Type: 'Type: Manga',
      Creation: 'Creation date: 1998',
    },
    {
      title: 'Card Title 2',
      description:
        'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img:
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg',
    },
    {
      title: 'Card Title 3',
      description:
        'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img:
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg',
    },
    {
      title: 'Card Title 4',
      description:
        'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img:
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg',
    },
  ];
  isActive = false;

  constructor() {}

  ngOnInit(): void {}
}
