const { getUserId } = require("../utils");

const getUser = (parent, args, context, info) => {
	const userId = getUserId(context);
	return context.prisma.user({ id: userId });
}

const getVaccinations = (parent, args, context, info) => {
	return context.prisma.vaccinations();
}

const getUserVaccinations = async (parent, args, context, info) => {
	const userId = getUserId(context);

	let user = await context.prisma.user({ id: userId });
	delete user.password;

	let userVaccinations;
	let vaccinations;
	let child;
	let orderBy = args.orderBy ? args.orderBy : "createdAt_DESC";

	
	if (args.childId && args.childId != "null") {
		const childId = args.childId;
		
		child = await context.prisma.child({ id: childId });

		userVaccinations = await context.prisma.userVaccinations({
			where: { 
				user: { id: userId },
				child: { id: childId },
				OR: [
					{type: {dose: parseInt(args.filter)}},
					{type: {name_contains: args.filter}}
				]
			},
			skip: args.skip,
			first: args.first,
			orderBy: orderBy
		});
		vaccinations = await context.prisma.userVaccinations({
			where: { 
				child: { id: childId },
				OR: [
					{type: {dose: parseInt(args.filter)}},
					{type: {name_contains: args.filter}}
				]
			},
			skip: args.skip,
			first: args.first,
			orderBy: orderBy
		}).type();
		
	} else {
		userVaccinations = await context.prisma.userVaccinations({
			where: {
				AND: [
					{user: { id: userId }},
					{child: null }
				],
				OR: [
					{type: {dose: parseInt(args.filter)}},
					{type: {name_contains: args.filter}}
				]
			},
			skip: args.skip,
			first: args.first,
			orderBy: orderBy
		})
		
		vaccinations = await context.prisma.userVaccinations({
			where: {
				OR: [
					{type: {dose: parseInt(args.filter)}},
					{type: {name_contains: args.filter}}
				]
			},
			skip: args.skip,
			first: args.first,
			orderBy: orderBy
		}).type();
	}

	userVaccinations = userVaccinations.map((userVacc, index) => {
		userVacc.type = vaccinations[index].type;
		userVacc.user = user;
		userVacc.child = child;
		return userVacc;
	});

	userVaccinations.sort((a, b) => {
		let dateA, dateB;
		if (orderBy.includes("nextDose")) {
			dateA = a.nextDose;
			dateB = b.nextDose;
		} else if (orderBy.includes("protectUntil")) {
			dateA = a.protectUntil;
			dateB = b.protectUntil;
		}
		if (dateA === dateB) return 0;
		else if (dateA === null) return 1;
		else if (dateB === null) return -1;
		else if (orderBy.includes("ASC")) return dateA < dateB ? -1 : 1;
		else return dateA < dateB ? 1 : -1;
	})
	
	if (args.first) {
		userVaccinations = userVaccinations.slice(0, args.first);
	}

	return userVaccinations;
}

const getChild = async (parent, args, context, info) => {
	const userId = getUserId(context);
	const child = await context.prisma.children({
		where: {AND: 
			[
				{ parent: { id: userId } },
				{ name: args.name }
			]
		}
	});

	return child;
}

const getFamilyVaccinations = async(parent, args, context, info) => {
	const userId = getUserId(context);

	let user = await context.prisma.user({ id: userId });
	delete user.password;

	let userVaccinations;
	let vaccinations;
	let children;

	let orderBy = args.orderBy ? args.orderBy : "createdAt_DESC";
	userVaccinations = await context.prisma.userVaccinations({
		where: {
			user: { id: userId },
			OR: [
				{type: {dose: parseInt(args.filter)}},
				{type: {name_contains: args.filter}}
			]
		},
		skip: args.skip,
		orderBy: orderBy
	});
	vaccinations = await context.prisma.userVaccinations({
		where: {
			user: { id: userId }, 
			OR: [
				{type: {dose: parseInt(args.filter)}},
				{type: {name_contains: args.filter}}
			]
		},
		skip: args.skip,
		orderBy: orderBy
	}).type();
	children = await context.prisma.userVaccinations({
		where: {
			user: { id: userId }, 
			OR: [
				{type: {dose: parseInt(args.filter)}},
				{type: {name_contains: args.filter}}
			]
		},
		skip: args.skip,
		orderBy: orderBy
	}).child();

	userVaccinations = userVaccinations.map((userVacc, index) => {
		userVacc.user = user;
		userVacc.type = vaccinations[index].type;
		userVacc.child = children[index].child;

		return userVacc;
	});

	userVaccinations.sort((a, b) => {
		let dateA, dateB;
		if (orderBy.includes("nextDose")) {
			dateA = a.nextDose;
			dateB = b.nextDose;
		} else if (orderBy.includes("protectUntil")) {
			dateA = a.protectUntil;
			dateB = b.protectUntil;
		}
		if (dateA === dateB) return 0;
		else if (dateA === null) return 1;
		else if (dateB === null) return -1;
		else if (orderBy.includes("ASC")) return dateA < dateB ? -1 : 1;
		else return dateA < dateB ? 1 : -1;
	})

	if (args.first) {
		userVaccinations = userVaccinations.slice(0, args.first);
	}

	return userVaccinations;
}

module.exports = {
	getUser,
	getVaccinations,
	getUserVaccinations,
	getChild,
	getFamilyVaccinations
}