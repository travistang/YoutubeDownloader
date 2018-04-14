import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
// import 'rxjs/add/observable/of';
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
  constructor(public http: HttpClient,private transfer: FileTransfer,private file: File) {
    this.http = http
    this.serverURL = "http://10.8.0.1:5000"

    this.downloadProgress = {}
  }

  searchVideo(searchString: string) {
    console.log('searching video')
    return this.http
      .get(`${this.serverURL}/search/${encodeURIComponent(searchString)}`)
  }

  getProgressById(id: string) {
    return this.downloadProgress[id]
  }

  download(type: string,id: string) {
    if(id in this.downloadProgress) return
    this.downloadProgress[id] = { loadingTask: true }
    return this.http
      .get(`${this.serverURL}/${type}/${encodeURIComponent(id)}`)

      .subscribe((response : any) => {
        let url = response.url
        let fileSize = response.size
        // let url = response.url
        // let header = response.headers

        let filePath = `${this.file.dataDirectory}/${type}/${id}.${(type == 'audio')?'mp3':'mp4'}`
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
          this.downloadProgress[id].progressPercentage = Math.floor((progress.loaded / this.downloadProgress[id].fileSize) * 100)
        })
        transferObject
            .download(url,filePath)
            .then(() => {
              this.downloadProgress[id].completed = true
            },
            error => {
              alert(error)
              this.downloadProgress[id].completed = true
              this.downloadProgress[id].hasError = true
            }
          )
      })
      // TODO: persitence for app quitting
      // TODO: check if file has already exists
      // TODO: error handling
  }

  // abort an operation
  // TODO: test this
  abort(id: string) {
    if(!(id in this.downloadProgress)) return
    if(!this.downloadProgress[id].transferObject) return
    this.downloadProgress[id].transferObject.abort()
    delete this.downloadProgress[id]
  }
}
