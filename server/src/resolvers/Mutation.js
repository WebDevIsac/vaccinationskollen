const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId } = require("../utils");
require("dotenv").config();

const signup = async (parent, args, context, info) => {
	const password = await bcrypt.hash(args.password, 10);
	const user = await context.prisma.createUser({ ...args, password });
	const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

	return {
		token,
		user
	};
};

const login = async (parent, args, context, info) => {
	const user = await context.prisma.user({ email: args.email });
	if (!user) {
		throw new Error("No such user found");
	}

	const valid = await bcrypt.compare(args.password, user.password);
	if (!valid) {
		throw new Error("Invalid password");
	}

	const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

	return {
		token,
		user
	};
};

const addUserVaccination = (parent, args, context, info) => {
	const userId = getUserId(context);

	if (args.childId != null && args.childId != "null") {
		return context.prisma.createUserVaccination({
			user: { connect: { id: userId } },
			child: { connect: { id: args.childId } },
			type: { connect: { id: args.vaccinationId } },
			takenAt: args.takenAt,
			nextDose: args.nextDose,
			protectUntil: args.protectUntil
		})
	} else {
		return context.prisma.createUserVaccination({
			user: { connect: { id: userId } },
			type: { connect: { id: args.vaccinationId } },
			takenAt: args.takenAt,
			nextDose: args.nextDose,
			protectUntil: args.protectUntil
		})

	}
}

const addChild = async (parent, args, context, info) => {
	const userId = getUserId(context);
	const child = await context.prisma.createChild({
		parent: { connect: { id: userId } },
		name: args.name,
		born: args.born
	});

	return child;
}

const deleteUserVaccination = async (parent, args, context, info) => {
	return await context.prisma.deleteUserVaccination({
		id: args.id 
	})
}

module.exports = {
	signup,
	login,
	addUserVaccination,
	addChild,
	deleteUserVaccination,
};
