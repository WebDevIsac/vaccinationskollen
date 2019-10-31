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

	return context.prisma.createUserVaccination({
		user: { connect: { id: userId } },
		type: { connect: { id: args.vaccinationId } },
		takenAt: args.takenAt
	})
}

module.exports = {
	signup,
	login,
	addUserVaccination
};
