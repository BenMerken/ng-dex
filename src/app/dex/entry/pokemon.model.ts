import {NameAndUrl} from '@app/dex/dex.model';

export type APIPokemonType = {
	type: NameAndUrl;
};

export type APIGenus = {
	genus: string;
	language: {
		name: string;
	};
};

export type APIPokemon = {
	id: number;
	name: string;
	sprites: {
		front_default: string;
	};
	types: APIPokemonType[];
};
