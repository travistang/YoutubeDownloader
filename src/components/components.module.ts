import { NgModule } from '@angular/core';
import { DownloadButtonComponent } from './download-button/download-button';
import { SearchResultCellComponent } from './search-result-cell/search-result-cell';
import { ErrorMessageComponent } from './error-message/error-message';
@NgModule({
	declarations: [DownloadButtonComponent,
    SearchResultCellComponent,
    ErrorMessageComponent],
	imports: [],
	exports: [DownloadButtonComponent,
    SearchResultCellComponent,
    ErrorMessageComponent]
})
export class ComponentsModule {}
