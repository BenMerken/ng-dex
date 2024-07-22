import { TitleCasePipe } from '@angular/common';
import {Component, input} from '@angular/core';

import {GenDataItem} from '@app/dex/dex.model';

@Component({
	selector: 'dex-entry',
	standalone: true,
	imports: [TitleCasePipe],
	templateUrl: './entry.component.html',
	styleUrl: './entry.component.scss'
})
export class EntryComponent {
	pokemon = input.required<GenDataItem>();
}
