import {Routes} from '@angular/router';

import {Gen1Component} from '@app/gen-1/gen-1.component';
import {HomeComponent} from '@app/home/home.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'dex',
		pathMatch: 'full'
	},
	{
		path: 'dex',
		component: HomeComponent
	},
	{
		path: 'dex/gen-1',
		component: Gen1Component
	}
];
