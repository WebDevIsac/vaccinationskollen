import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, AsyncStorage, Alert } from "react-native";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { AUTH_TOKEN } from "../constants";
import { signIn, getToken } from "../loginUtils";

const Login = ({newToken}) => {
	const [login, setLogin] = useState(true);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const SIGNUP_MUTATION = gql`
		mutation SignupMutation($name: String!, $email: String!, $password: String!) {
			signup(name: $name, email: $email, password: $password) {
				token
			}
		}
	`;

	const LOGIN_MUTATION = gql`
		mutation LoginMutation($email: String!, $password: String!) {
			login(email: $email, password: $password) {
				token
			}
		}
	`;

	const confirm = async (data) => {
		const { token } = login ? data.login : data.signup;
		await signIn(token);
		newToken();
	};

	return (
		<View style={styles.container}>
			<Mutation 
				mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION} 
				variables={{ name, email, password }}
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
				{( mutation, { data }) => (
					<View>
						{!login && (
							<TextInput
								style={styles.input}
								textContentType="name"
								placeholder="Your name"
								onChangeText={text => setName(text)}
								value={name}
							/>
						)}
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
							onPress={mutation}
							title={login ? "Logga In" : "Skapa Konto"}
						/>
					</View>
				)}
			</Mutation>
			<Button
				title={
					login
						? "Vill du skapa ett konto?"
						: "Har du redan ett konto?"
				}
				onPress={() => setLogin(!login)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
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
