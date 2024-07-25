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
	private _pokemons = signal<NameAndUrl[]>([]);
	private _pokemonTypes = signal<NameAndUrl[]>([]);
	private _pokemonDetail = signal<APIPokemon | null>(null);

	pokemons = this._pokemons.asReadonly();
	types = this._pokemonTypes.asReadonly();
	pokemonDetail = this._pokemonDetail.asReadonly();

	getPokemonsForGen(gen: number) {
		return this.httpClient.get<GenAPIData>(`${this.pokeAPIUrl}/generation/${gen}`).pipe(
			map((data) => ({pokemon: data.pokemon_species, types: data.types})),
			tap((data) => {
				this._pokemons.set(
					data.pokemon.sort((a, b) => {
						const aId = Number(a.url.split('/')[6]);
						const bId = Number(b.url.split('/')[6]);

						return aId - bId;
					})
				);
				this._pokemonTypes.set(data.types);
			})
		);
	}

	getPokemonDetail(pokemonId: string) {
		return this.httpClient.get<APIPokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
	}

	updateDexDetail(pokemon: APIPokemon) {
		this._pokemonDetail.set(pokemon);
	}
}
