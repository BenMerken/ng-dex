import {Component, computed, DestroyRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute, ResolveFn} from '@angular/router';

import {DexService} from '@app/dex/dex.service';
import { TypesDirective } from '@app/dex/types.directive';

@Component({
	selector: 'dex-entry-detail',
	standalone: true,
	imports: [TypesDirective],
	templateUrl: './entry-detail.component.html',
	styleUrl: './entry-detail.component.scss'
})
export class EntryDetailComponent implements OnInit {
	private activatedRoute = inject(ActivatedRoute);
	private dexService = inject(DexService);
	private destroyRef = inject(DestroyRef);

	pokemon = computed(() => this.dexService.pokemonDetail());

	ngOnInit(): void {
		const activatedRouteSub = this.activatedRoute.params.subscribe((params) => {
			const pokemonSub = this.dexService.getPokemonDetail(params['pokemonId']).subscribe();

			this.destroyRef.onDestroy(() => {
				pokemonSub.unsubscribe();
			});
		});

		this.destroyRef.onDestroy(() => {
			activatedRouteSub.unsubscribe();
		});
	}
}

export const resolvePageTitle: ResolveFn<string> = () => {
	const dexService = inject(DexService);

	return `${dexService.pokemonDetail()?.name} | NG Dex`;
};
