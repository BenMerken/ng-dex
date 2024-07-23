export type NameAndUrl = {
	name: string;
	url: string;
};

export type GenAPIData = {
	pokemon_species: NameAndUrl[];
	types: NameAndUrl[];
};
