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

export const setDateFromTime = (time, takenAtDate) => {
	if (time) {
		let setDate;

		if (time.includes("veck")) {
			time = parseInt(time);

			setDate = new Date(takenAtDate.getTime() + (time * 7) * 24 * 60 * 60 * 1000);

		} else if (time.includes("månad")) {
			time = parseInt(time);

			setDate = new Date(takenAtDate.getTime() + (time * 30) * 24 * 60 * 60 * 1000);
		} else if (time.includes("år")) {
			time = parseInt(time);

			setDate = new Date(takenAtDate.getTime() + (time * 365) * 24 * 60 * 60 * 1000);
		}
		
		return setDate;
	}
}