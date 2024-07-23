import {NameAndUrl} from '@app/dex/dex.model';

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
	types: {
		type: NameAndUrl;
	}[];
};
