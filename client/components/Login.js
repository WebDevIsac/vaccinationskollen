import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Button, AsyncStorage, Alert, ActivityIndicator } from "react-native";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import navStyles from "../styles/navStyles";

import { signIn } from "../loginUtils";

const Login = ({screenProps}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const LOGIN_MUTATION = gql`
		mutation LoginMutation($email: String!, $password: String!) {
			login(email: $email, password: $password) {
				token
			}
		}
	`;

	const confirm = async (data) => {
		const { token } = data.login;
		await signIn(token);
		screenProps.updateToken();
	};

	return (
		<View style={styles.container}>
			<Mutation 
				mutation={LOGIN_MUTATION} 
				variables={{ email, password }}
				onError={({ graphQLErrors }) => {
					Alert.alert(
						'Failed to login',
						graphQLErrors[0].message,
						{text: 'OK'},
						{cancelable: false},
					  );
				}}
				onCompleted={(data) => confirm(data)}
			>
				{( mutation, { loading, error, data }) => {
					if (isLoading) return <ActivityIndicator size="large"/>
					else {
						setIsLoading(loading);
						return (
							<View>
								<TextInput
									style={styles.input}
									textContentType="emailAddress"
									placeholder="Your email"
									onChangeText={text => setEmail(text)}
									value={email}
								/>
								<TextInput
									style={styles.input}
									textContentType="password"
									placeholder="Your password"
									onChangeText={text => setPassword(text)}
									value={password}
								/>
								<Button
									title="Logga In"
									onPress={() => {
										mutation();
									}}
								/>
							</View>
						)
					}
					
				}}
			</Mutation>
			{!isLoading && (
				<Button
					title="Vill du skapa ett konto?"
					onPress={() => {
						screenProps.setLogin(false);
					}}
				/>
			)}
		</View>
	);
};

Login.navigationOptions = {
	title: "Login",
	...navStyles
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "center"
	},
	input: {
		margin: 10,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10,
		borderWidth: 2,
		width: 200,
		height: 40,
		borderColor: "#000"
	}
});

export default Login;
