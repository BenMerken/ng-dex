import {UpperCasePipe} from '@angular/common';
import {Component, computed, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

import {DexService} from '@app/dex/dex.service';
import {TypesDirective} from '@app/dex/types.directive';

@Component({
	selector: 'dex-filter',
	standalone: true,
	imports: [ReactiveFormsModule, TypesDirective, UpperCasePipe],
	templateUrl: './filter.component.html',
	styleUrl: './filter.component.scss'
})
export class FilterComponent {
	private dexService = inject(DexService);

	typesList = computed(() => this.dexService.types());

	form = new FormGroup({
		name: new FormControl<string>(''),
		types: new FormArray([...this.typesList().map(() => new FormControl(false))])
	});
}
