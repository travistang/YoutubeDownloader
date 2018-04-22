import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Subject } from "rxjs/Subject";
import { Platform } from 'ionic-angular';
import { Media } from '@ionic-native/media'
import SearchResult from '../../pages/home/result'
/*
  Generated class for the YoutubeDownloaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class YoutubeDownloaderProvider {
  serverURL : string
  downloadProgress: object
  fileTransfer: FileTransferObject
  filePath: string
  public progressSubject: Subject<object> = new Subject()

  constructor(public http: HttpClient,private platform: Platform,private transfer: FileTransfer,private file: File,private media: Media) {
    this.http = http
    this.serverURL = "http://10.8.0.1:5000"
    // this.serverURL = 'http://10.8.0.2:5000'
    this.downloadProgress = {}
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

    setTimeout(() => this.downloadSample(),5000)
  }

  searchVideo(searchString: string) {
    console.log('searching video')
    return this.http
      .get(`${this.serverURL}/search/${encodeURIComponent(searchString)}`)
  }

  getProgressById(id: string) {
    return this.downloadProgress[id]
  }
  // download a sample audio for debugging purpose
  downloadSample() {
    alert('download sample!')
    let filename = btoa(JSON.stringify({
      type: 'audio',
      id: 'None',
      name: 'Sample Audio',
      duration: '1:00'
    }))
    let filePath = `${this.filePath}${filename}.mp3`
    let transferObject = this.transfer.create()
    transferObject.download(`${this.serverURL}/debug/sample_audio`,filePath)
      .then(() => {
        alert('finished downloading the sample! now try to play it')
        alert(`path: ${filePath}`)
        this.file.resolveLocalFilesystemUrl(filePath).then(entry => {
          alert('translated as' + entry.toInternalURL())
          let sound = this.media.create(entry.toInternalURL())
          // sound.onStatusUpdate.subscribe(status => (status)); // fires when file status changes

          sound.onSuccess.subscribe(() => alert('Action is successful'));

          sound.onError.subscribe(error => alert('Error!'+ error));
          // let sound = new Howl({
          //   src: [entry.toInternalURL()],
          //   preload: true,
          //   html5: true,
          //   onloaderror:(id,msg) => {alert('onloaderror:' + msg)},
          //   onplayerror:(id,msg) => {alert('onplayerror:' + msg)},
          // })
          alert('play!')
          sound.play()
        })
      })
  }

  download(type: string,searchResult: SearchResult) {
    // if(id in this.downloadProgress) return
    let id = searchResult.id
    let name = searchResult.name
    this.downloadProgress[id] = { loadingTask: true }
    this.notifyWaiting(id)
    return this.http
      .get(`${this.serverURL}/${type}/${encodeURIComponent(id)}`)

      .subscribe((response : any) => {
        let url = response.url
        let fileSize = response.size
        // let url = response.url
        // let header = response.headers
        let filename = btoa(JSON.stringify({
          type,
          id,
          name,
          duration: searchResult.duration,
        }))
        let filePath = `${this.file.dataDirectory}${filename}.ogg`
        // register this download Progress
        let transferObject = this.transfer.create()
        // initialize download progress object
        this.downloadProgress[id] = Object.assign({},this.downloadProgress[id],{
          type,
          url,
          filePath,
          transferObject,
          progressPercentage: 0,
          completed: false,
          hasError: false,
          fileSize,
          loadingTask: false,
        })
        // register onProgress listener
        transferObject.onProgress(progress => {
          let progressVal = Math.floor((progress.loaded / this.downloadProgress[id].fileSize) * 100)
          this.downloadProgress[id].progressPercentage = progressVal
          this.notifyProgress(id,progressVal)
        })
        /***** Download begin! *****/
        this.notifyStarted(id)
        transferObject
            .download(url,filePath)
            .then(() => {
              this.downloadProgress[id].completed = true
              this.notifyCompleted(id)
            },
            error => {
              this.notifyError(id)
              this.downloadProgress[id].completed = true
              this.downloadProgress[id].hasError = true
            }
          )
      })
  }

  // abort an operation
  // TODO: test this
  abort(id: string) {
    if(!(id in this.downloadProgress)) return
    if(!this.downloadProgress[id].transferObject) return
    this.downloadProgress[id].transferObject.abort()
    delete this.downloadProgress[id]
    this.progressSubject.next( {
      'type': 'abort',
      'id': id
    })
  }

  notifyError(id: string) {
    this.progressSubject.next({
      'type': 'error',
      'id': id
    })
  }
  notifyCompleted(id: string) {
    this.progressSubject.next({
      'type': 'completed',
      'id': id,
    })
  }
  notifyStarted(id: string) {
    this.progressSubject.next({
      'type': 'begin',
      'id': id
    })
  }
  notifyProgress(id:string, progressVal: number) {
    this.progressSubject.next({
      'type': 'progress',
      'id': id,
      'progress': progressVal
    })
  }
  notifyWaiting(id:string) {
    this.progressSubject.next({
      'type': 'waiting',
      'id': id,
    })
  }
}
