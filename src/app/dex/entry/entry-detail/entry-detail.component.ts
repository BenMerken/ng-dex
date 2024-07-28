import {UpperCasePipe} from '@angular/common';
import {Component, computed, DestroyRef, inject, input, OnInit} from '@angular/core';
import {ActivatedRoute, ResolveFn} from '@angular/router';

import {DexService} from '@app/dex/dex.service';
import {PokemonNamePipe} from '@app/dex/entry/pokemon-name.pipe';
import {TypesDirective} from '@app/dex/types.directive';
import titleCase from '@utils/title-case';

@Component({
	selector: 'dex-entry-detail',
	standalone: true,
	imports: [TypesDirective, UpperCasePipe, PokemonNamePipe],
	templateUrl: './entry-detail.component.html',
	styleUrl: './entry-detail.component.scss'
})
export class EntryDetailComponent implements OnInit {
	private activatedRoute = inject(ActivatedRoute);
	private dexService = inject(DexService);
	private destroyRef = inject(DestroyRef);

	pokemonId = input.required<string>();

	pokemon = computed(() =>
		this.dexService
			.pokemonDetails()
			.find((pokemon) => pokemon.id.toString() === this.pokemonId())
	);

	ngOnInit(): void {
		const activatedRouteSub = this.activatedRoute.params.subscribe((params) => {
			const pokemonDetail = this.dexService
				.pokemonDetails()
				.find((pokemon) => pokemon.id.toString() === params['pokemonId']);

			if (pokemonDetail) {
				return;
			} else {
				const pokemonSub = this.dexService.getPokemonForId(params['pokemonId']).subscribe();

				this.destroyRef.onDestroy(() => {
					pokemonSub.unsubscribe();
				});
			}
		});

		this.destroyRef.onDestroy(() => {
			activatedRouteSub.unsubscribe();
		});
	}
}

export const resolvePageTitle: ResolveFn<string> = (activatedRoute) => {
	const dexService = inject(DexService);

	const pokemonName = dexService
		.pokemonDetails()
		.find((pokemon) => pokemon.id.toString() === activatedRoute.params['pokemonId'])?.name;

	return `${titleCase(pokemonName ?? 'Pokémon Detail')} | NG Dex`;
};
