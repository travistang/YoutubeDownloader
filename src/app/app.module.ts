import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Media } from '@ionic-native/media';
import { NativeAudio } from '@ionic-native/native-audio'
import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';
import {NavigationPage} from '../pages/navigation/navigation';

import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { YoutubeDownloaderProvider } from '../providers/youtube-downloader/youtube-downloader';
import {DownloadButtonComponent} from '../components/download-button/download-button'
import {SearchResultCellComponent} from '../components/search-result-cell/search-result-cell'
import {PlayerCellComponent} from '../components/player-cell/player-cell'
import {ErrorMessageComponent} from '../components/error-message/error-message'
import { PlayerProvider } from '../providers/player/player';


import { PlayerControlComponent } from '../components/player-control/player-control'
@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    NavigationPage,
    // DownloadButtonComponent,
    // SearchResultCellComponent,
    // ErrorMessageComponent,
    PlayerControlComponent,
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
    // HomePage,
    NavigationPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Media,
    NativeAudio,
    FileTransfer,
    File,
    FileOpener,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    YoutubeDownloaderProvider,
    PlayerProvider
  ]
})
export class AppModule {}
