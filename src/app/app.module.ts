import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { YoutubeDownloaderProvider } from '../providers/youtube-downloader/youtube-downloader';

import {DownloadButtonComponent} from '../components/download-button/download-button'
import {SearchResultCellComponent} from '../components/search-result-cell/search-result-cell'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DownloadButtonComponent,
    SearchResultCellComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    File,
    FileOpener,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    YoutubeDownloaderProvider
  ]
})
export class AppModule {}
