import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button, AsyncStorage, Alert, ActivityIndicator } from "react-native";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { AUTH_TOKEN } from "../constants";
import { signIn, getToken } from "../loginUtils";
import navStyles from "../styles/navStyles";

const Register = ({screenProps}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState();

	const SIGNUP_MUTATION = gql`
		mutation SignupMutation($name: String!, $email: String!, $password: String!) {
			signup(name: $name, email: $email, password: $password) {
				token
			}
		}
	`;

	const confirm = async (data) => {
		const { token } = data.signup;
		await signIn(token);
		screenProps.updateToken();
		screenProps.setFirstTime(true);
	};

	return (
		<View style={styles.container}>
			<Mutation 
				mutation={SIGNUP_MUTATION} 
				variables={{ name, email, password }}
				onError={({ graphQLErrors }) => {
					if (graphQLErrors[0].message.includes("Field name = email")) {
						setEmailError("Den här emailaddressen används redan.")
					}
					setIsLoading(false);
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
									textContentType="name"
									placeholder="Your name"
									onChangeText={text => setName(text)}
									value={name}
								/>
								<TextInput
									style={[styles.input, emailError && {borderColor: "#FF3355"}]}
									textContentType="emailAddress"
									placeholder="Your email"
									onChangeText={text => setEmail(text)}
									value={email}
								/>
								<Text style={emailError ? styles.errorMessage : styles.hideMessage}>{emailError}</Text>
								<TextInput
									style={styles.input}
									textContentType="password"
									placeholder="Your password"
									onChangeText={text => setPassword(text)}
									value={password}
								/>
								<Button
									onPress={() => {
										mutation();
									}}
									title="Skapa Konto"
								/>
							</View>
						)
					}
					
				}}
			</Mutation>
			{!isLoading && (
				<Button
					title="Har du redan ett konto?"
					onPress={() => {
						screenProps.setLogin(true);
					}}
				/>
			)}
		</View>
	);
};

Register.navigationOptions = {
	title: "Registrera dig",
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
		marginVertical: 10,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10,
		borderWidth: 2,
		width: 240,
		height: 40,
		borderColor: "#000"
	},
	errorMessage: {
		fontSize: 12,
		color: "#FF3355",
		backgroundColor: "#FEE0E0",
		width: 240,
	},
	hideMessage: {
		display: "none"
	}
});

export default Register;