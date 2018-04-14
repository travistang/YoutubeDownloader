import { Component,Input } from '@angular/core';
import ErrorMessage from '../../pages/home/errorMessage'
/**
 * Generated class for the ErrorMessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'error-message',
  templateUrl: 'error-message.html'
})
export class ErrorMessageComponent {
  @Input() message: ErrorMessage

  constructor() {

  }

}
