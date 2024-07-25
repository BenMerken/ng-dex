import {Routes} from '@angular/router';

import {GenComponent, resolveTitle as resolveGenPageTitle} from '@app/gen/gen.component';
import {HomeComponent} from '@app/home/home.component';
import {PageNotFoundComponent} from '@app/page-not-found/page-not-found.component';
import {EntryDetailComponent, resolvePageTitle as resolveEntryDetailPageTitle} from './dex/entry/entry-detail/entry-detail.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'dex/gen/:genNumber',
		component: GenComponent,
		title: resolveGenPageTitle,
		children: [
			{
				path: 'pokemon/:pokemonId',
				component: EntryDetailComponent,
        title: resolveEntryDetailPageTitle
			}
		]
	},
	{
		path: '**',
		component: PageNotFoundComponent,
		title: '404: Page Not Found'
	}
];
