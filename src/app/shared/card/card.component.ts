import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
	selector: 'dex-card',
	standalone: true,
	imports: [MatCardModule],
	templateUrl: './card.component.html'
})
export class CardComponent {}
