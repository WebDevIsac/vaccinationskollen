import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button, AsyncStorage, Alert, ActivityIndicator } from "react-native";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import navStyles from "../styles/navStyles";

import { signIn } from "../loginUtils";

const Login = (props) => {
	const { screenProps } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("isaclarsson@gmail.com");
	const [password, setPassword] = useState("password");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

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
		screenProps.setFirstTime(false);
	};

	return (
		<View style={styles.container}>
			<Mutation 
				mutation={LOGIN_MUTATION} 
				variables={{ email, password }}
				onError={({ graphQLErrors }) => {
					if (graphQLErrors[0].message.includes("No such user found")) {
						setEmailError("Denna användaren kunde inte hittas.")
					}
					if (graphQLErrors[0].message.includes("Invalid password")) {
						setPasswordError("Felaktigt lösenord angivet")
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
								<Text style={passwordError ? styles.errorMessage : styles.hideMessage}>{passwordError}</Text>
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
		color: "#FEB4AE",
		backgroundColor: "#FEE0E0",
		width: 240
	},
	hideMessage: {
		display: "none"
	}
});

export default Login;
