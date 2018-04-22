import { NgModule } from '@angular/core';
import { DownloadButtonComponent } from './download-button/download-button';
import { SearchResultCellComponent } from './search-result-cell/search-result-cell';
import { ErrorMessageComponent } from './error-message/error-message';
import { PlayerCellComponent } from './player-cell/player-cell';
import { PlayerControlComponent } from './player-control/player-control';
@NgModule({
	declarations: [DownloadButtonComponent,
    SearchResultCellComponent,
    ErrorMessageComponent,
    PlayerCellComponent,
    PlayerControlComponent],
	imports: [],
	exports: [DownloadButtonComponent,
    SearchResultCellComponent,
    ErrorMessageComponent,
    PlayerCellComponent,
    PlayerControlComponent]
})
export class ComponentsModule {}
