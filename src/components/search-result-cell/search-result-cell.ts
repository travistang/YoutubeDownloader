import { Component,Input,Output,EventEmitter } from '@angular/core'
import SearchResult from '../../pages/home/result'
import {YoutubeDownloaderProvider} from '../../providers/youtube-downloader/youtube-downloader'

/**
 * Generated class for the SearchResultCellComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search-result-cell',
  templateUrl: 'search-result-cell.html'
})
export class SearchResultCellComponent {

  @Input() result: SearchResult
  @Output() click: EventEmitter<any> = new EventEmitter()
  expanded: boolean
  downloadedType: string

  constructor(private youtubeDownloader: YoutubeDownloaderProvider) {
    this.expanded = false
  }

  onClick() {
    this.expanded = !this.expanded
    // TODO: emit suitable event so that other cells would be collapsed
    this.click.emit('')
  }
  downloadAudio() {
    this.download('audio')
  }

  downloadVideo() {
    this.download('video')
  }
  download(type: string) {
    // also check if the download is processing
    // if yes then stop the downloading (pressed twice)
    let progress = this.youtubeDownloader.getProgressById(this.result.id)
    if(progress) {
      this.youtubeDownloader.abort(this.result.id)
      this.downloadedType = null
      return
    }
    this.downloadedType = type
    this.youtubeDownloader.download(type,this.result.id)
  }

}
