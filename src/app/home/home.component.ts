import {Component} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox'

@Component({
	selector: 'dex-home',
	standalone: true,
	imports: [MatCheckboxModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {}
