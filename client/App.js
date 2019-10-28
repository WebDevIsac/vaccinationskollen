import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

import { AUTH_TOKEN } from "./constants";
import { InMemoryCache } from "apollo-boost";

const App = () => {

	const httpLink = createHttpLink({
		uri: "http://localhost:4000"
	});

	const authLink = setContext((trash, { headers }) => {
		const token = localStorage.getItem(AUTH_TOKEN);

		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : ""
			}
		}
	});

	const link = authLink.concat(httpLink);

	const client = new ApolloClient({
		link,
		cache: new InMemoryCache()
	});


	return (
		<ApolloProvider client={client}>
			<View style={styles.container}>
				<Text>Hello</Text>
			</View>
		</ApolloProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});

export default App;
