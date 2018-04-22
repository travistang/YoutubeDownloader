import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PlayerProvider } from '../../providers/player/player'
/**
 * Generated class for the NavigationPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-navigation',
  templateUrl: 'navigation.html'
})
export class NavigationPage {

  searchRoot = 'HomePage'
  playerRoot = 'PlayerPage'
  downloadsRoot = 'DownloadsPage'


  constructor(public navCtrl: NavController,private player: PlayerProvider) {}

}
