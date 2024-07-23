import {Routes} from '@angular/router';

import {Gen1Component, resolveTitle} from '@app/gen/gen.component';
import {HomeComponent} from '@app/home/home.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'dex',
		pathMatch: 'full',
	},
	{
		path: 'dex',
    title: 'NG Dex',
		component: HomeComponent
	},
	{
		path: 'dex/gen/:genNumber',
		component: Gen1Component,
    title: resolveTitle
	}
];
