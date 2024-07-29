import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';
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
import {ActivatedRoute, ChildrenOutletContexts, ResolveFn, RouterOutlet} from '@angular/router';

import {DexService} from '@app/dex/dex.service';
import {EntryComponent} from '@app/dex/entry/entry.component';
import {FilterComponent, PokemonFilterValues} from '@app/gen/filter/filter.component';

@Component({
	selector: 'dex-gen',
	standalone: true,
	imports: [EntryComponent, RouterOutlet, FilterComponent],
	templateUrl: './gen.component.html',
	styleUrl: './gen.component.scss',
	animations: [
		trigger('routeAnimations', [
			transition('* <=> PokemonDetailPage', [
				style({position: 'relative'}),
				query(':enter, :leave', [
					style({position: 'absolute', top: 0, left: 0, width: '100%'})
				]),
				query(':enter', [style({left: '-100%'})], {optional: true}),
				query(':leave', animateChild(), {optional: true}),
				group([
					query(':leave', [animate('300ms ease-out', style({left: '100%'}))], {
						optional: true
					}),
					query(':enter', [animate('300ms ease-out', style({left: '0%'}))], {
						optional: true
					})
				])
			])
		])
	]
})
export class GenComponent implements AfterViewInit, OnInit {
	private dexService = inject(DexService);
	private destroyRef = inject(DestroyRef);
	private activatedRoute = inject(ActivatedRoute);
	private contexts = inject(ChildrenOutletContexts);

	genNumber = input.required<number>();

	pokemonsFilters = signal<PokemonFilterValues | null>(null);
	typesFilterString = computed(
		() =>
			this.pokemonsFilters()
				?.types.filter((type) => type.checked)
				.map((type) => type.name)
				.join(', ') ?? ''
	);
	pokemons = computed(() => {
		const pokemonFilters = this.pokemonsFilters();

		if (!pokemonFilters) {
			return this.dexService.pokemons();
		}

		return this.dexService.pokemons().filter((pokemon) => {
			const pokemonDetailsNames = pokemonFilters.types.some((type) => type.checked)
				? this.dexService
						.pokemonDetails()
						.filter((pokemon) =>
							pokemon.types
								.map((type) => type.type.name)
								.some((typeName) =>
									pokemonFilters.types
										.filter((typeFilter) => typeFilter.checked)
										.map((type) => type.name)
										.some((tn) => tn === typeName)
								)
						)
						.map((pokemon) => pokemon.name)
				: this.dexService.pokemons().map((pokemon) => pokemon.name);

			return (
				pokemonDetailsNames.includes(pokemon.name) &&
				pokemon.name
					.toLowerCase()
					.includes(this.pokemonsFilters()?.name?.toLowerCase() ?? '')
			);
		});
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

	getRouteAnimationData() {
		return this.contexts.getContext('primary')?.route?.snapshot.data?.['animation'];
	}
}

export const resolveTitle: ResolveFn<string> = (activatedRoute) => {
	return `Generation ${activatedRoute.params['genNumber']} | NG Dex`;
};
