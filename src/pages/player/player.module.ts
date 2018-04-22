import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerPage } from './player';
import { PlayerCellComponent } from '../../components/player-cell/player-cell'
@NgModule({
  declarations: [
    PlayerPage,
    PlayerCellComponent,
  ],
  imports: [
    IonicPageModule.forChild(PlayerPage),
  ],
})
export class PlayerPageModule {}
