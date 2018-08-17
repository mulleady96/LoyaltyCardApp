import { Component } from '@angular/core';


@Component({
  selector: 'flash-card',
  templateUrl: 'flash-card.html'
})
export class FlashCardComponent {

  flipped: boolean = false;

  constructor() {
    console.log('Hello FlashCardComponent Component');
  }

  flip(){
    this.flipped = !this.flipped;
  }

}
