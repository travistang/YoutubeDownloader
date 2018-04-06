import { NgModule } from '@angular/core';
import { DownloadButtonComponent } from './download-button/download-button';
import { SearchResultCellComponent } from './search-result-cell/search-result-cell';
@NgModule({
	declarations: [DownloadButtonComponent,
    SearchResultCellComponent],
	imports: [],
	exports: [DownloadButtonComponent,
    SearchResultCellComponent]
})
export class ComponentsModule {}
