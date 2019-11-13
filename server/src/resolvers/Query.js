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

	if (args.childId) {
		const childId = args.childId;
		
		child = await context.prisma.child({ id: childId });

		userVaccinations = await context.prisma.userVaccinations({
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
				OR: [
					{type: {dose: parseInt(args.filter)}},
					{type: {name_contains: args.filter}}
				]
			},
			skip: args.skip,
			first: args.first,
			orderBy: args.orderBy
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
			orderBy: args.orderBy
		}).type();
	}

	userVaccinations = userVaccinations.map((userVacc, index) => {
		userVacc.type = vaccinations[index].type;
		userVacc.user = user;
		userVacc.child = child;
		return userVacc;
	})

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

const getChildVaccinations = async (parent, args, context, info) => {
	const userId = getUserId(context);
	const childId = args.id;

	let user = await context.prisma.user({ id: userId });
	delete user.password;

	let child = await context.prisma.child({ id: childId });

	let childVaccinations = await context.prisma.userVaccinations({
		where: { 
			child: { id: childId },
			OR: [
				{type: {dose: parseInt(args.filter)}},
				{type: {name_contains: args.filter}}
			]
		},
		skip: args.skip,
		first: args.first,
		orderBy: args.orderBy
	});
	const vaccinations = await context.prisma.userVaccinations({
		where: { 
			child: { id: childId },
			OR: [
				{type: {dose: parseInt(args.filter)}},
				{type: {name_contains: args.filter}}
			]
		},
		skip: args.skip,
		first: args.first,
		orderBy: args.orderBy
	}).type();

	childVaccinations = childVaccinations.map((childVacc, index) => {
		childVacc.type = vaccinations[index].type;
		childVacc.user = user;
		childVacc.child = child;
		return childVacc;
	});

	return childVaccinations;
}

const getFamilyVaccinations = async(parent, args, context, info) => {
	const userId = getUserId(context);

	let user = await context.prisma.user({ id: userId });

	delete user.password;

	let userVaccinations = await context.prisma.userVaccinations({
		where: { 
			OR: [
				{type: {dose: parseInt(args.filter)}},
				{type: {name_contains: args.filter}}
			]
		},
		skip: args.skip,
		first: args.first,
		orderBy: args.orderBy
	});
	let vaccinations = await context.prisma.userVaccinations({
		where: { 
			OR: [
				{type: {dose: parseInt(args.filter)}},
				{type: {name_contains: args.filter}}
			]
		},
		skip: args.skip,
		first: args.first,
		orderBy: args.orderBy
	}).type();
	let children = await context.prisma.userVaccinations({
		where: { 
			OR: [
				{type: {dose: parseInt(args.filter)}},
				{type: {name_contains: args.filter}}
			]
		},
		skip: args.skip,
		first: args.first,
		orderBy: args.orderBy
	}).child();


	userVaccinations.map((userVacc, index) => {
		userVacc.user = user;
		userVacc.type = vaccinations[index].type;
		userVacc.child = children[index].child;
	});

	return userVaccinations;
}

module.exports = {
	getUser,
	getVaccinations,
	getUserVaccinations,
	getChild,
	getChildVaccinations,
	getFamilyVaccinations
}