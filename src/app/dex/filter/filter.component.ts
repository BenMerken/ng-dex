import {UpperCasePipe} from '@angular/common';
import {Component, computed, DestroyRef, inject, OnInit, output} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

import {DexService} from '@app/dex/dex.service';
import {TypesDirective} from '@app/dex/types.directive';

export type PokemonFilterValues = Partial<{
	name: string | null;
	types: (boolean | null)[];
}>;

@Component({
	selector: 'dex-filter',
	standalone: true,
	imports: [ReactiveFormsModule, TypesDirective, UpperCasePipe],
	templateUrl: './filter.component.html',
	styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
	private dexService = inject(DexService);
	private destroyRef = inject(DestroyRef);

	typesList = computed(() => this.dexService.types());

	form = new FormGroup({
		name: new FormControl<string>(''),
		types: new FormArray([...this.typesList().map(() => new FormControl(false))])
	});

	filterChange = output<PokemonFilterValues>();

	ngOnInit(): void {
		const formChangeSub = this.form.valueChanges.subscribe({
			next: (change) => {
				this.filterChange.emit(change);
			}
		});

		this.destroyRef.onDestroy(() => {
			formChangeSub.unsubscribe();
		});
	}
}
