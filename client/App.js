import React from "react";
import { StyleSheet, Text, View, AsyncStorage, Button } from "react-native";
import { ApolloProvider, Mutation } from "react-apollo";
import { HttpLink, InMemoryCache, ApolloClient, gql } from "apollo-boost";
import { setContext } from "apollo-link-context";

import { getToken } from "./loginUtils";

import Login from "./components/Login";


const authLink = setContext(async (trash, { headers }) => {
	const token = await getToken();

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ""
		}
	}
});

const httpLink = new HttpLink({
	uri: "http://localhost:4000"
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
});

const signup = gql`
	mutation addUser($name: String, $email: String!, $password: String!){
		signup(data: {name: $name, email: $email, password: $password}) {
			token
		}
	}
`;

const App = () => {
	return (
		<ApolloProvider client={client}>
			<View style={styles.container}>
				<Mutation mutation={signup}>
					{(addUser, { data }) => (
						<Button
							onPress={() => {
								addUser({variables: {name: "hej", email: "hej", password: "hej"}}).then(res => console.log(res)).catch(err => console.log(err))
							}}
							title="Signup"
						/>
					)}
				</Mutation>
			</View>
		</ApolloProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});

export default App;
