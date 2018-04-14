import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener} from '@ionic-native/file-opener';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import SearchResult from './result';
import {YoutubeDownloaderProvider} from '../../providers/youtube-downloader/youtube-downloader'
// import { Socket } from 'ng-socket-io';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { DownloadButtonComponent } from '../../components/download-button/download-button'

import ErrorMessage from './errorMessage'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  searchText: string;
  searchbarClass: string;
  searchbarAuxTextClass: string;
  isSearchbarOnFocus: boolean;
  isLoadingSearchResults: boolean;
  searchResults: Array<SearchResult>;

  errorMessage: ErrorMessage;
//  transfer: FileTransfer;
  fileTransfer: FileTransferObject;

  constructor(
    public navCtrl: NavController,
    public http: Http,
    private transfer: FileTransfer,
    private file: File,
    private fileopener: FileOpener,
    private youtubeProvider: YoutubeDownloaderProvider
  ) {
    this.http = http
    this.fileTransfer = transfer.create()

    this.searchText = ""
    this.searchbarClass = "searchbar-initial-pos"
    this.searchbarAuxTextClass = ""
    this.isSearchbarOnFocus = false
    this.searchResults = []
    this.isLoadingSearchResults = false

    this.errorMessage = null
  }
  onSearchTextChange() {
    if(this.searchText.trim().length == 0) return
    // clear the error message once the user has deleted something

    document.getElementById('search-input').blur()
    // request resources
    this.searchResults = []
    this.isLoadingSearchResults = true
    // this.http.get(url).map(res => res.json())
    this.youtubeProvider
      .searchVideo(this.searchText)
      .timeout(5000)
      .subscribe((data: any) => {
  	    this.isLoadingSearchResults = false
  	    this.searchResults = data.map(result => new SearchResult(result.name,result.video_url,result.duration,result.thumbnail_url))
      },
      (error: any) => {
        console.log(error)
        this.isLoadingSearchResults = false
        this.errorMessage = new ErrorMessage(
          'Request Timeout',
          'Please check your Internet connection and try again'
        )
      })
  }
  onKeyDown() {
    if(this.errorMessage != null) this.errorMessage = null
  }
  onSearchBarFocus() {
    if(!this.isSearchbarOnFocus) {
      this.searchbarClass = "searchbar-focus"
      this.searchbarAuxTextClass = "searchbar-aux-focus"
      this.isSearchbarOnFocus = true
    }
  }

  onSearchBarBlur() {
    if(this.isSearchbarOnFocus && this.searchText.length == 0) {
      this.searchbarClass = "searchbar-initial-pos searchbar-blur"
      this.searchbarAuxTextClass = ""
      this.isSearchbarOnFocus = false
      this.errorMessage = null
    }
  }
}
