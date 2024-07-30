import {Routes} from '@angular/router';

import {HomeComponent} from '@app/home/home.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		pathMatch: 'full',
	},
	{
		path: 'dex/gen/:genNumber',
		loadComponent: () => import('./gen/gen.component').then((mod) => mod.GenComponent),
		loadChildren: () => import('./gen/gen.routes').then((mod) => mod.routes)
	},
	{
		path: '**',
		loadComponent: () =>
			import('./page-not-found/page-not-found.component').then(
				(mod) => mod.PageNotFoundComponent
			),
		title: '404: Page Not Found'
	}
];
