import {AfterViewInit, Component, DestroyRef, inject, OnInit} from '@angular/core';

import {DexService} from '@app/dex/dex.service';
import { EntryComponent } from "../dex/entry/entry.component";

@Component({
	selector: 'dex-gen-1',
	standalone: true,
	imports: [EntryComponent],
	templateUrl: './gen-1.component.html',
	styleUrl: './gen-1.component.scss'
})
export class Gen1Component implements AfterViewInit, OnInit {
	private dexService = inject(DexService);
	private destroyRef = inject(DestroyRef);

	pokemons = this.dexService.pokemons.asReadonly();
	types = this.dexService.types.asReadonly();

	ngOnInit(): void {
		const getGen1Sub = this.dexService.getGen1().subscribe();

		this.destroyRef.onDestroy(() => {
			getGen1Sub.unsubscribe();
		});
	}

	ngAfterViewInit(): void {
		if (typeof document === 'undefined') {
			return;
		}

		document.querySelector('body')?.classList.add('gen-1');

		this.destroyRef.onDestroy(() => {
			document.querySelector('body')?.classList.remove('gen-1');
		});
	}
}
