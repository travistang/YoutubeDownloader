import { Component, Input } from '@angular/core';
import SearchResult from '../../pages/home/result'
import {YoutubeDownloaderProvider} from '../../providers/youtube-downloader/youtube-downloader'
import { ApplicationRef } from '@angular/core'
/**
 * Generated class for the DownloadButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'download-button',
  templateUrl: 'download-button.html'
})
export class DownloadButtonComponent {

  @Input() isVideoButton: boolean
  @Input() searchResult: SearchResult
  downloadProgress: number

  // download state

  hasBegun: boolean = false
  completed: boolean = false
  hasError: boolean = false
  waiting: boolean = false
  // UI state flags
  constructor(
      private youtubeDownloader: YoutubeDownloaderProvider,
      private applicationRef: ApplicationRef) {
    this.downloadProgress = 0
    this.youtubeDownloader.progressSubject.subscribe((payload : any) => {
      if(payload.id != this.searchResult.id) return
      // set waiting flag
      this.waiting = payload.type == 'waiting'
      switch(payload.type) {
        case 'begin': {
          this.hasBegun = true
          break
        }
        case 'progress': {
          this.downloadProgress = payload.progress
          break
        }
        case 'completed': {
          this.completed = true
          break
        }
        case 'error': {
          this.hasError = true
          break
        }
        case 'abort': {
          // reset state
          this.hasBegun = false
          this.completed = false
          this.hasError = false
        }
        default: return
      }
      this.applicationRef.tick()
    })
  }
  getText() {
    /*
      If download has not started: avText
      If download has started: percentage
      If download has finished with error: 'Error'
      If download is completed: 'Completed'
    */
    if(this.waiting) {
      return 'Waiting for Reply...'
    }
    if(!this.hasBegun) {
      return this.avText()
    }
    // download completed successfully
    if(this.hasBegun && this.completed) {
      return 'Completed'
    }
    // has Error
    if (this.hasBegun && this.hasError) {
      return 'Error'
    }
    if (this.hasBegun && !this.completed) {
      return `${this.downloadProgress}%`
    }
    return ''
  }

  getIcon() {
    // not started
    if(!this.hasBegun) {
      return this.isVideoButton?'ios-videocam':'ios-musical-notes'
    }
    // hasError
    if(this.hasError) {
      return 'ios-close'
    }
    // completed
    if(this.completed) {
      return 'ios-checkmark'
    }
    // downloading
    if (this.hasBegun && ! this.completed) {
      return 'ios-arrow-round-down'
    }
    return ''
  }

  avText() {
    return this.isVideoButton?'video':'audio'
  }

}
