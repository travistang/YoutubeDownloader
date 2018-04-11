import { Component, Input } from '@angular/core';
import SearchResult from '../../pages/home/result'
import {YoutubeDownloaderProvider} from '../../providers/youtube-downloader/youtube-downloader'

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

  // UI state flags
  constructor(private youtubeDownloader: YoutubeDownloaderProvider) {

  }

  getProgressObject() {
    return this.youtubeDownloader.getProgressById(this.searchResult.id)
  }

  isWaitingForServerReply() {
    let progress = this.getProgressObject()
    if(!progress) return false // not even clicked
    let res = progress.loadingTask // progressObject created, check if is loading Task
    return res
  }
  getDownloadStatus() {
    let progress = this.getProgressObject()
    if(!progress) return -1 // not started
    if(progress.loadingTask) return 2
    if(progress.completed) {
      if(progress.hasError) return -2 //finished with Error
      return 1 // success
    }
    return 0 // in progress
  }
  getText() {
    /*
      If download has not started: avText
      If download has started:
        Not calculatable: "Downloading..."
        else: percentage "%"
      If download has finished with error: 'Error'
      If has media file with the same id: play button,
    */
    let status = this.getDownloadStatus()
    switch(status) {
      case -1: return this.avText()
      case -2: return 'error'
      case 0: {
        let progressObject = this.getProgressObject()
        // is in progress, and the progress is calculatable
        if(progressObject.isProgressCalculatable) return `${progressObject.progressPercentage}%`
        // is in progress, but the progress is not calculatable
        return `Downloading...`
      }
      default: return ''
    }
  }
  getIcon() {
    let status = this.getDownloadStatus()
    switch(status) {
      case -1: return this.isVideoButton?'ios-videocam':'ios-musical-notes'
      case -2: return 'ios-close'
      case 0: return 'ios-arrow-round-down'
      default: return 'ios-check'
    }

  }

  shouldIconColorInvertOnHover() {
    let status = this.getDownloadStatus()
    return !(status == 2 || status == 0)
  }

  avText() {
    return this.isVideoButton?'video':'audio'
  }

}
