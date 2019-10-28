const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUserId = context => {
	const authorization = context.request.get("Authorization");
	if (authorization) {
		const token = authorization.replace("Bearer ", "");
		const { userId } = jwt.verify(token, process.env.APP_SECRET);

		return userId;
	}

	throw new Error("Not authenticated");
};

module.exports = {
	getUserId
};
