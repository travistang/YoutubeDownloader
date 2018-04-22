import { Component,Input } from '@angular/core';
import Media from '../../providers/player/media'
import {PlayerProvider} from '../../providers/player/player'
/**
 * Generated class for the PlayerCellComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'player-cell',
  templateUrl: 'player-cell.html'
})
export class PlayerCellComponent {

  @Input() media: Media

  constructor(private player: PlayerProvider) {

  }
  onItemClick() {
    this.player.changeMedia(this.media)
  }
}
