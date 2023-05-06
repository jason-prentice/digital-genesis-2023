export const capitalizeTitle = title => {
	const lowercaseWords = ["the", "an", "a", "of", "for", "in", "under", "with", "on", "in"];
	return title.split("_").map((word, index) => {
		if (index === 0 ||
			lowercaseWords.indexOf(word.toLowerCase()) === -1) {
			return word.substring(0, 1).toUpperCase() + word.substring(1);
		}
		return word.toLowerCase();
		
	}).join(" ");
}