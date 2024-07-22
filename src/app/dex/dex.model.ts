export type GenDataItem = {
	name: string;
	url: string;
};

export type GenAPIData = {
	pokemon_species: GenDataItem[];
	types: GenDataItem[];
};
