import {HttpClient} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {map, tap} from 'rxjs';

import {GenAPIData, GenDataItem} from '@app/dex/dex.model';

@Injectable({
	providedIn: 'root'
})
export class DexService {
	private httpClient = inject(HttpClient);
	private pokeAPIUrl = 'https://pokeapi.co/api/v2';

	pokemons = signal<GenDataItem[]>([]);
	types = signal<GenDataItem[]>([]);

	getGen1() {
		return this.getPokemonsForGen(1);
	}

	getGen2() {
		return this.getPokemonsForGen(2);
	}

	getGen3() {
		return this.getPokemonsForGen(3);
	}

	private getPokemonsForGen(gen: number) {
		return this.httpClient.get<GenAPIData>(`${this.pokeAPIUrl}/generation/${gen}`).pipe(
			map((data) => ({pokemon: data.pokemon_species, types: data.types})),
			tap((data) => {
				this.pokemons.set(data.pokemon);
				this.types.set(data.types);
			})
		);
	}
}
