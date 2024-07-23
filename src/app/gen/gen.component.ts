import {AfterViewInit, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {ResolveFn} from '@angular/router';

import {DexService} from '@app/dex/dex.service';
import {EntryComponent} from '@app/dex/entry/entry.component';

@Component({
	selector: 'dex-gen',
	standalone: true,
	imports: [EntryComponent],
	templateUrl: './gen.component.html',
	styleUrl: './gen.component.scss'
})
export class Gen1Component implements AfterViewInit, OnInit {
	private dexService = inject(DexService);
	private destroyRef = inject(DestroyRef);

	genNumber = input.required<number>();

	pokemons = this.dexService.pokemons.asReadonly();
	types = this.dexService.types.asReadonly();

	loading = signal(false);
	error = signal(null);

	ngOnInit(): void {
		this.loading.set(true);

		const getGenSub = this.dexService.getPokemonsForGen(this.genNumber()).subscribe({
			error: (error) => {
				this.error.set(error);
			},
			complete: () => {
				this.loading.set(false);
			}
		});

		this.destroyRef.onDestroy(() => {
			getGenSub.unsubscribe();
		});
	}

	ngAfterViewInit(): void {
		if (typeof document === 'undefined') {
			return;
		}

		document.querySelector('body')?.classList.add(`gen-${this.genNumber()}`);

		this.destroyRef.onDestroy(() => {
			document.querySelector('body')?.classList.remove(`gen-${this.genNumber()}`);
		});
	}
}

export const resolveTitle: ResolveFn<string> = (activatedRoute) => {
	return `Generation ${activatedRoute.params['genNumber']} | NG Dex`;
};
