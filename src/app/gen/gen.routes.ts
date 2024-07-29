import {Routes} from '@angular/router';

import {
	EntryDetailComponent,
	resolvePageTitle as resolveEntryDetailPageTitle
} from '@app/dex/entry/entry-detail/entry-detail.component';

export const routes: Routes = [
	{
		path: 'pokemon/:pokemonId',
		component: EntryDetailComponent,
		title: resolveEntryDetailPageTitle,
		data: {
			animation: 'PokemonDetailPage'
		}
	}
];
