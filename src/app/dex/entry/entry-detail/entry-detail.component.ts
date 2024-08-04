import {UpperCasePipe} from '@angular/common';
import {Component, computed, DestroyRef, inject, input, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ActivatedRoute, RouterLink} from '@angular/router';

import {PokemonNamePipe} from '@app/dex/entry/pokemon-name.pipe';
import {TypesDirective} from '@app/dex/types.directive';
import {DexService} from '@services/dex/dex.service';

@Component({
	selector: 'dex-entry-detail',
	standalone: true,
	imports: [
		TypesDirective,
		UpperCasePipe,
		PokemonNamePipe,
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		RouterLink
	],
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
