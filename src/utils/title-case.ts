const titleCase = (val: string): string => {
	return `${val.charAt(0).toUpperCase()}${val.substring(1)}`;
};

export default titleCase;
