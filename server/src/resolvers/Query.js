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

	const vaccinations = await context.prisma.userVaccinations({where: { user: { id: userId } } }).type();
	let userVaccinations = await context.prisma.userVaccinations({where: { user: { id: userId } } });
	userVaccinations = userVaccinations.map((userVacc, index) => {
		userVacc.type = vaccinations[index].type;
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

const getChildVaccinations = (parent, args, context, info) => {
	
}


module.exports = {
	getUser,
	getVaccinations,
	getUserVaccinations,
	getChild
}