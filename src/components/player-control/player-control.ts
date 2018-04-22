import { Component } from '@angular/core';

/**
 * Generated class for the PlayerControlComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'player-control',
  templateUrl: 'player-control.html'
})
export class PlayerControlComponent {

  text: string;

  constructor() {
    console.log('Hello PlayerControlComponent Component');
    this.text = 'Hello World';
  }

}
