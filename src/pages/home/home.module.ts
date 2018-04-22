import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ErrorMessageComponent } from '../../components/error-message/error-message'
import {DownloadButtonComponent} from '../../components/download-button/download-button'
import {SearchResultCellComponent} from '../../components/search-result-cell/search-result-cell'

@NgModule({
  declarations: [
    HomePage,
    DownloadButtonComponent,
    SearchResultCellComponent,
    ErrorMessageComponent,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
