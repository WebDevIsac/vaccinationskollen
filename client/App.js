import React from "react";
import { StyleSheet, Text, View, AsyncStorage, Button } from "react-native";
import { ApolloProvider } from "react-apollo";
import { HttpLink, InMemoryCache, ApolloClient, gql } from "apollo-boost";
import { setContext } from "apollo-link-context";

import { getToken } from "./loginUtils";

import Navigator from "./Navigator";


const authLink = setContext(async (trash, { headers }) => {
	const token = getToken();

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ""
		}
	}
});

const httpLink = new HttpLink({
	uri: "https://vaccinationskollen-server.herokuapp.com/"
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
	link,
	cache: new InMemoryCache()
});

const App = () => {
	return (
		<ApolloProvider client={client}>
				<Navigator />
		</ApolloProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "center"
	}
});

export default App;
