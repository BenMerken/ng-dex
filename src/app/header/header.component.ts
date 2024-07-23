import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

type HeaderLink = {
	label: string;
	href: string;
};

@Component({
	selector: 'dex-header',
	standalone: true,
	imports: [RouterLink, RouterLinkActive],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent {
	links: HeaderLink[] = [
		{
			label: 'Home',
			href: '/dex'
		},
		{
			label: 'Gen 1',
			href: '/dex/gen/1'
		},
		{
			label: 'Gen 2',
			href: '/dex/gen/2'
		},
		{
			label: 'Gen 3',
			href: '/dex/gen/3'
		}
	];
}
