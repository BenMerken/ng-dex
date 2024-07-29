import {UpperCasePipe} from '@angular/common';
import {Component, computed, DestroyRef, inject, OnInit, output} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {DexService} from '@app/dex/dex.service';
import {TypesDirective} from '@app/dex/types.directive';

export type PokemonFilterValues = {
	name: string;
	types: {name: string; checked: boolean}[];
};

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
		name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
		types: new FormArray(
			[
				...this.typesList().map(
					() =>
						new FormControl(false, {
							nonNullable: true,
							validators: [Validators.required]
						})
				)
			],
			{validators: [Validators.required]}
		)
	});

	filterChange = output<PokemonFilterValues>();

	ngOnInit(): void {
		const formChangeSub = this.form.valueChanges.subscribe({
			next: (change) => {
				this.filterChange.emit({
					name: change.name ?? '',
					types: change.types!.map((typeChecked, index) => ({
						name: this.typesList()[index].name,
						checked: typeChecked
					}))
				});
			}
		});

		this.destroyRef.onDestroy(() => {
			formChangeSub.unsubscribe();
		});
	}
}
