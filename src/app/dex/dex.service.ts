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
	private _pokemonDetails = signal<APIPokemon[]>([]);

	pokemons = this._pokemons.asReadonly();
	types = this._pokemonTypes.asReadonly();
	pokemonDetails = this._pokemonDetails.asReadonly();

	getTypes() {
		return this.httpClient.get<{results: NameAndUrl[]}>(`${this.pokeAPIUrl}/type`).pipe(
			map((data) => data.results),
			tap((data) => {
				this._pokemonTypes.set(data);
			})
		);
	}

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
			})
		);
	}

	getPokemonForId(pokemonId: string) {
		return this.httpClient
			.get<APIPokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
			.pipe(
				tap((pokemon) => {
					this._pokemonDetails.update((old) => {
						const a = old.find((pokemon) => pokemon.id.toString() === pokemonId);

						if (a) {
							return old.map((pokemon) => (a.id === pokemon.id ? {...a} : pokemon));
						}

						return [...old, pokemon];
					});
				})
			);
	}
}
