import {Routes} from '@angular/router';

import {Gen1Component, resolveTitle} from '@app/gen/gen.component';
import {HomeComponent} from '@app/home/home.component';
import {PageNotFoundComponent} from '@app/page-not-found/page-not-found.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'dex/gen/:genNumber',
		component: Gen1Component,
		title: resolveTitle
	},
	{
		path: '**',
		component: PageNotFoundComponent,
    title: '404: Page Not Found'
	}
];
