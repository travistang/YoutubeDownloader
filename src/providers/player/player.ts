import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import Media from '../../providers/player/media'
import { NativeAudio } from '@ionic-native/native-audio';
import {Media as MediaPlayer, MediaObject } from '@ionic-native/media'
import {Subject} from 'rxjs/Subject'
import { Platform } from 'ionic-angular';
import { Howl } from 'howler'
/*
  Generated class for the PlayerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlayerProvider {
  public mediaList: Array<Media>
  public playerSubject: Subject<object> = new Subject()
  public currentPlayingFile: any
  public filePath: string
  constructor(private platform: Platform,private file: File,private mediaPlayer: MediaPlayer,private nativeAudio: NativeAudio) {
    // this.filePath = platform.is('android')?file.externalDataDirectory:file.documentsDirectory
    platform.ready().then(() => {
      if(platform.is('ios')) {
        alert('ios')
        this.filePath = file.documentsDirectory

      }
      else {
        alert('android')
        this.filePath = file.dataDirectory
      }
    })
    .catch(e => alert(JSON.stringify(e)))
  }
  refresh() {
    // return this.file.listDir(this.filePath,'')
    return this.file.resolveLocalFilesystemUrl(this.filePath)
      .then(path => this.file.listDir(path.toInternalURL(),''))
      .then(files => {
        this.mediaList = files.map(f => new Media(f.name.split('.')[0]))
      })
  }

  changeMedia(media: Media) {
    // TODO: check if there are media playing already

    let path = `${this.filePath}${media.rawName}.ogg`
    this.file.resolveLocalFilesystemUrl(path).then(url => {
      this.currentPlayingFile = new Howl({
        src: [url.toInternalURL()],
        preload:true,
        html5:true,
        onloaderror:(id,msg) => {alert('onloaderror:' + msg)},
        onplayerror:(id,msg) => {alert('onplayerror:' + msg)},
      })
      // this.currentPlayingFile.once('load',function() {
      // })
      alert('play')
      this.currentPlayingFile.play()

    })
  }
}
