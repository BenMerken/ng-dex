import {AfterViewInit, Component, DestroyRef, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
	selector: 'dex-page-not-found',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './page-not-found.component.html',
	styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent implements AfterViewInit {
	private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute)

	ngAfterViewInit(): void {
		const activatedRouteSub = this.activatedRoute.params.subscribe((params) => {
			if (typeof document === 'undefined') {
				return;
			}

			document.querySelector('body')?.classList.remove('not-found');
			document.querySelector('body')?.classList.add('not-found');

			this.destroyRef.onDestroy(() => {
				document.querySelector('body')?.classList.remove('not-found');
			});
		});

		this.destroyRef.onDestroy(() => {
			activatedRouteSub.unsubscribe();
		});
	}
}
