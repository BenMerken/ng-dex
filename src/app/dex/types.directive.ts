import {Directive, ElementRef, input, OnChanges, SimpleChanges} from '@angular/core';

import {APIPokemonType} from '@app/dex/entry/pokemon.model';

@Directive({
	selector: '[pokeTypes]',
	standalone: true
})
export class TypesDirective implements OnChanges {
	pokeTypes = input<APIPokemonType[]>();

	constructor(private el: ElementRef) {}

	ngOnChanges(changes: SimpleChanges): void {
		const {currentValue, previousValue} = changes['pokeTypes'];

		previousValue?.forEach((typeObj: APIPokemonType) => {
			this.el.nativeElement.classList.remove(typeObj.type.name);
		});
		currentValue && this.el.nativeElement.classList.add(currentValue[0].type.name);
	}
}
