import {
	AfterViewInit,
	Component,
	computed,
	DestroyRef,
	inject,
	input,
	OnInit,
	signal
} from '@angular/core';
import {ActivatedRoute, ResolveFn, RouterOutlet} from '@angular/router';

import {DexService} from '@app/dex/dex.service';
import {EntryComponent} from '@app/dex/entry/entry.component';
import {FilterComponent, PokemonFilterValues} from '../dex/filter/filter.component';

@Component({
	selector: 'dex-gen',
	standalone: true,
	imports: [EntryComponent, RouterOutlet, FilterComponent],
	templateUrl: './gen.component.html',
	styleUrl: './gen.component.scss'
})
export class GenComponent implements AfterViewInit, OnInit {
	private dexService = inject(DexService);
	private destroyRef = inject(DestroyRef);
	private activatedRoute = inject(ActivatedRoute);

	genNumber = input.required<number>();

	pokemonsFilters = signal<PokemonFilterValues | null>(null);
	pokemons = computed(() => {
		if (!this.pokemonsFilters()) {
			return this.dexService.pokemons();
		}

		return this.dexService
			.pokemons()
			.filter((pokemon) =>
				pokemon.name
					.toLowerCase()
					.includes(this.pokemonsFilters()?.name?.toLowerCase() ?? '')
			);
	});
	types = this.dexService.types;

	loading = signal(false);
	error = signal(null);

	ngOnInit(): void {
		const getTypesSub = this.dexService.getTypes().subscribe();
		const activatedRouteSub = this.activatedRoute.params.subscribe((params) => {
			this.loading.set(true);

			const getGenSub = this.dexService.getPokemonsForGen(params['genNumber']).subscribe({
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
		});

		this.destroyRef.onDestroy(() => {
			activatedRouteSub.unsubscribe();
			getTypesSub.unsubscribe();
		});
	}

	ngAfterViewInit(): void {
		const activatedRouteSub = this.activatedRoute.params.subscribe((params) => {
			if (typeof document === 'undefined') {
				return;
			}

			document.querySelector('body')?.classList.remove(`gen-${this.genNumber()}`);
			document.querySelector('body')?.classList.add(`gen-${params['genNumber']}`);

			this.destroyRef.onDestroy(() => {
				document.querySelector('body')?.classList.remove(`gen-${params['genNumber']}`);
			});
		});

		this.destroyRef.onDestroy(() => {
			activatedRouteSub.unsubscribe();
		});
	}

	onPokemonFilterChange(filterValues: PokemonFilterValues) {
		this.pokemonsFilters.set(filterValues);
	}
}

export const resolveTitle: ResolveFn<string> = (activatedRoute) => {
	return `Generation ${activatedRoute.params['genNumber']} | NG Dex`;
};
