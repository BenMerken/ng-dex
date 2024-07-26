import {UpperCasePipe} from '@angular/common';
import {Component, computed, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

import {NameAndUrl} from '@app/dex/dex.model';
import {DexService} from '@app/dex/dex.service';
import {PokemonNamePipe} from '@app/dex/entry/pokemon-name.pipe';
import {TypesDirective} from '@app/dex/types.directive';

@Component({
	selector: 'dex-entry',
	standalone: true,
	imports: [PokemonNamePipe, UpperCasePipe, TypesDirective, RouterLink, RouterLinkActive],
	templateUrl: './entry.component.html',
	styleUrl: './entry.component.scss'
})
export class EntryComponent implements OnInit {
	private dexService = inject(DexService);
	private destroyRef = inject(DestroyRef);

	pokemon = input.required<NameAndUrl>();
	pokemonDetail = computed(() =>
		this.dexService
			.pokemonDetails()
			.find((pokemon) => pokemon.id.toString() === this.pokemon().url.split('/')[6])
	);
	detailLink = computed(() => `pokemon/${this.pokemonDetail()?.id}`);

	ngOnInit(): void {
		const sub = this.dexService.getPokemonForId(this.pokemon().url.split('/')[6]).subscribe();

		this.destroyRef.onDestroy(() => {
			sub.unsubscribe();
		});
	}
}
