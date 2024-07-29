import {inject} from '@angular/core';
import {ResolveFn, Routes} from '@angular/router';
import {DexService} from '@app/dex/dex.service';

import titleCase from '@utils/title-case';

const resolvePageTitle: ResolveFn<string> = (activatedRoute) => {
	const dexService = inject(DexService);

	const pokemonName = dexService
		.pokemonDetails()
		.find((pokemon) => pokemon.id.toString() === activatedRoute.params['pokemonId'])?.name;

	return `${titleCase(pokemonName ?? 'Pokémon Detail')} | NG Dex`;
};

export const routes: Routes = [
	{
		path: 'pokemon/:pokemonId',
		loadComponent: () =>
			import('../dex/entry/entry-detail/entry-detail.component').then(
				(mod) => mod.EntryDetailComponent
			),
		title: resolvePageTitle,
		data: {
			animation: 'PokemonDetailPage'
		}
	}
];
