import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
import {PlayerProvider} from '../../providers/player/player';
import { ApplicationRef } from '@angular/core'

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {
  searchBoxFocused: boolean = false
  searchText: string = ''
  advanceSearchFilterOpened: boolean = false
  advanceSearchFilterList: Array<object> = [
    {
      name: 'Media Type',
      color: 'lightgreen',
      options: [
        {
          icon:'ios-videocam-outline',
          value: 'video',
        },
        {
          icon:'ios-musical-note-outline',
          value: 'audio',
        },
        {
          icon:'ios-close-circle-outline',
          value: 'all',
        },
      ],
      index: 0,
    },
    {
      name: 'Duration',
      color: 'lightblue',
      options: [
        {
          text: '< 3',
          // icon:'ios-videocam-outline',
          value: '<3 Minutes',
        },
        {
          text: '3 - 6',
          // icon:'ios-musical-note-outline',
          value: '3-6 Minutes',
        },
        {
          text: '>10',
          // icon:'ios-close-circle-outline',
          value: '>10 Minutes',
        },
      ],
      index: 0,
    },

  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    private player: PlayerProvider,
    private applicationRef: ApplicationRef) {
  }

  ionViewDidEnter() {
    this.player.refresh().then(() => this.applicationRef.tick())
  }
  onClearClicked() {
    this.searchText = ''
    document.getElementById('player-search-input').focus()
  }

  advanceSearchFilterClick(option) {
    option.index = (option.index + 1) % (option.options.length)
  }
}
