import {TitleCasePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';

import {NameAndUrl} from '@app/dex/dex.model';
import {APIPokemon} from '@app/dex/entry/pokemon.model';
import { TypesDirective } from '@app/dex/types.directive';

@Component({
	selector: 'dex-entry',
	standalone: true,
	imports: [TitleCasePipe, TypesDirective],
	templateUrl: './entry.component.html',
	styleUrl: './entry.component.scss'
})
export class EntryComponent implements OnInit {
	private httpClient = inject(HttpClient);
	private destroyRef = inject(DestroyRef);

	pokemon = input.required<NameAndUrl>();
	pokemonDetail = signal<APIPokemon | null>(null);

	ngOnInit(): void {
		const sub = this.httpClient
			.get<APIPokemon>(`https://pokeapi.co/api/v2/pokemon/${this.pokemon().url.split('/')[6]}`)
			.subscribe({
				next: (data) => {
					this.pokemonDetail.set(data);
				}
			});

		this.destroyRef.onDestroy(() => {
			sub.unsubscribe();
		});
	}
}
