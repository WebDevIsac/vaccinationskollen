export const translateDate = (date) => {
	let translated = date.toDateString();
	translated = translated.replace("Mon", "Mån");
	translated = translated.replace("Tue", "Tis");
	translated = translated.replace("Wed", "Ons");
	translated = translated.replace("Thu", "Tors");
	translated = translated.replace("Fri", "Fre");
	translated = translated.replace("Sat", "Lör");
	translated = translated.replace("Sun", "Sön");

	return translated;
}

export const setCorrectHours = (date) => {
	return new Date(date.setHours(date.getHours() + 2));
}