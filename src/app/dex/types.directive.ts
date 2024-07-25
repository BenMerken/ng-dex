import {AfterContentChecked, Directive, ElementRef, input, OnInit} from '@angular/core';

import {APIPokemonType} from '@app/dex/entry/pokemon.model';

@Directive({
	selector: '[pokeTypes]',
	standalone: true
})
export class TypesDirective implements AfterContentChecked {
	pokeTypes = input<APIPokemonType[]>();

	constructor(private el: ElementRef) {}

	ngAfterContentChecked(): void {
		//TODO: Add order of precedence logic
		const typeClass = this.pokeTypes()?.[0].type.name;

		if (typeClass) {
			this.el.nativeElement.classList.add(typeClass);
		}
	}
}
