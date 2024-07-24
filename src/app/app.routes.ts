import {Routes} from '@angular/router';

import {Gen1Component, resolveTitle} from '@app/gen/gen.component';
import {HomeComponent} from '@app/home/home.component';
import {PageNotFoundComponent} from '@app/page-not-found/page-not-found.component';
import {EntryDetailComponent} from './dex/entry/entry-detail/entry-detail.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'dex/gen/:genNumber',
		component: Gen1Component,
		title: resolveTitle,
		children: [
			{
				path: 'pokemon/:pokemonId',
				component: EntryDetailComponent
			}
		]
	},
	{
		path: '**',
		component: PageNotFoundComponent,
		title: '404: Page Not Found'
	}
];
