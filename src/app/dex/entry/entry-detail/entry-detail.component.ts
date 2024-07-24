import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {APIPokemon} from '../pokemon.model';
import {DexService} from '@app/dex/dex.service';

@Component({
	selector: 'dex-entry-detail',
	standalone: true,
	imports: [],
	templateUrl: './entry-detail.component.html',
	styleUrl: './entry-detail.component.scss'
})
export class EntryDetailComponent implements OnInit {
	private activatedRoute = inject(ActivatedRoute);
	private dexService = inject(DexService);
	private destroyRef = inject(DestroyRef);

	pokemon = signal<APIPokemon | null>(null);

	ngOnInit(): void {
		const activatedRouteSub = this.activatedRoute.params.subscribe((params) => {
			const pokemonSub = this.dexService.getPokemonDetail(params['pokemonId']).subscribe({
				next: (pokemon) => {
					this.pokemon.set(pokemon);
				}
			});

			this.destroyRef.onDestroy(() => {
				pokemonSub.unsubscribe();
			});
		});

		this.destroyRef.onDestroy(() => {
			activatedRouteSub.unsubscribe();
		});
	}
}
