export const buildDictionary = (startingObject: any[]) => {
	const dictionary = startingObject.reduce((acc, { name, color }) => {
		acc[name] = color;
		return acc;
	}, {});

	return dictionary;
};
