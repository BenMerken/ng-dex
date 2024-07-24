import {HttpClient} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {map, tap} from 'rxjs';

import {GenAPIData, NameAndUrl} from '@app/dex/dex.model';
import {APIPokemon} from '@app/dex/entry/pokemon.model';

@Injectable({
	providedIn: 'root'
})
export class DexService {
	private httpClient = inject(HttpClient);
	private pokeAPIUrl = 'https://pokeapi.co/api/v2';

	pokemons = signal<NameAndUrl[]>([]);
	types = signal<NameAndUrl[]>([]);

	getPokemonsForGen(gen: number) {
		return this.httpClient.get<GenAPIData>(`${this.pokeAPIUrl}/generation/${gen}`).pipe(
			map((data) => ({pokemon: data.pokemon_species, types: data.types})),
			tap((data) => {
				this.pokemons.set(
					data.pokemon.sort((a, b) => {
						const aId = Number(a.url.split('/')[6]);
						const bId = Number(b.url.split('/')[6]);

						return aId - bId;
					})
				);
				this.types.set(data.types);
			})
		);
	}

	getPokemonDetail(pokemonId: string) {
		return this.httpClient.get<APIPokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
	}
}
