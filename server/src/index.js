const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const Subscription = require("./resolvers/Subscription");

const resolvers = {
	Mutation,
	Query,
	Subscription
};

const server = new GraphQLServer({
	typeDefs: "./src/schema.graphql",
	resolvers,
	context: req => {
		return {
			...req,
			prisma
		};
	}
});

server.start(() => console.log("Server is running on http://localhost:4000"));