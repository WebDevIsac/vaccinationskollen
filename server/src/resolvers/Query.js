const { getUserId } = require("../utils");

function getUser(parent, args, context, info) {
	const userId = getUserId(context);
	return context.prisma.user({ id: userId });
}

module.exports = {
	getUser
}