export const sortVaccinations = (vaccinations, sortArgs, amount) => {
    let sortedVaccinations = vaccinations.sort((a, b) => {
		let dateA, dateB
		if (sortArgs) {
			if (sortArgs.includes("nextDose")) {
				dateA = a.nextDose;
				dateB = b.nextDose;
			} else if (sortArgs.includes("protectUntil")) {
				dateA = a.protectUntil;
				dateB = b.protectUntil;
			} else if (sortArgs.includes("takenAt")) {
				dateA = a.takenAt;
				dateB = b.takenAt;
			} else if (sortArgs.includes("createdAt")) {
				dateA = a.createdAt;
				dateB = b.createdAt;
			}
        } else {
            dateA = a.createdAt;
            dateB = b.createdAt
        }

        if (dateA === dateB) return 0;
        else if (dateA === null) return 1;
        else if (dateB === null) return -1;
        if (sortArgs && sortArgs.includes("ASC")) return dateA < dateB ? -1 : 1;
        else return dateA < dateB ? 1 : -1;
    })

    if (amount) {
        sortedVaccinations = sortedVaccinations.slice(0, amount);
	}
	
	return sortedVaccinations;
	
}