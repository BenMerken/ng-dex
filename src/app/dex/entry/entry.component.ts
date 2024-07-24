import {TitleCasePipe} from '@angular/common';
import {Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';

import {NameAndUrl} from '@app/dex/dex.model';
import { DexService } from '@app/dex/dex.service';
import { PokemonNamePipe } from '@app/dex/entry/pokemon-name.pipe';
import {APIPokemon} from '@app/dex/entry/pokemon.model';
import {TypesDirective} from '@app/dex/types.directive';

@Component({
	selector: 'dex-entry',
	standalone: true,
	imports: [PokemonNamePipe, TitleCasePipe, TypesDirective],
	templateUrl: './entry.component.html',
	styleUrl: './entry.component.scss'
})
export class EntryComponent implements OnInit {
	private dexService= inject(DexService);
	private destroyRef = inject(DestroyRef);

	pokemon = input.required<NameAndUrl>();
	pokemonDetail = signal<APIPokemon | null>(null);

	ngOnInit(): void {
		const sub = this.dexService.getPokemonDetail(this.pokemon().url.split('/')[6]).subscribe({
				next: (data) => {
					this.pokemonDetail.set(data);
				}
			});

		this.destroyRef.onDestroy(() => {
			sub.unsubscribe();
		});
	}
}
