import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button, AsyncStorage, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { Item, Label, Input } from "native-base";
import { Chevron } from "react-native-shapes";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import navStyles from "../styles/navStyles";

import { signIn } from "../utils/loginUtils";
import { Ionicons } from "@expo/vector-icons";

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
						setEmailError("Denna användaren kunde inte hittas.");
						setPasswordError(null);
					} else if (graphQLErrors[0].message.includes("Invalid password")) {
						setPasswordError("Felaktigt lösenord angivet");
						setEmailError(null);
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
							<View style={{width: "90%"}}>
								<Item floatingLabel style={[styles.item, emailError && {borderWidth: 1, borderColor: "#FF3355"}]}>
									<Label>
										<Ionicons name="ios-mail" size={25} color="gray" style={styles.inputIcon} /> Email
									</Label>
									<Input
										keyboardType="email-address"
										textContentType="emailAddress"
										onChangeText={text => setEmail(text)}
										value={email}
									/>
								</Item>
								<Text style={emailError ? styles.errorMessage : styles.hideMessage}>{emailError}</Text>
								<Item floatingLabel style={styles.item}>
									<Label>
										<Ionicons name="ios-lock" size={25} color="gray" style={styles.inputIcon} /> Lösenord
									</Label>
									<Input
										secureTextEntry={true}
										textContentType="password"
										onChangeText={text => setPassword(text)}
										value={password}
									/>
								</Item>
								<Text style={passwordError ? styles.errorMessage : styles.hideMessage}>{passwordError}</Text>
								<TouchableOpacity style={styles.button} onPress={() => {
									mutation();
								}}>
									<Text style={{ fontSize: 18, color: "#FFF" }}>Logga in</Text>
								</TouchableOpacity>
							</View>
						)
					}
				}}
			</Mutation>
			{!isLoading && (
				<TouchableOpacity style={styles.changeButton} onPress={() => { screenProps.setLogin(false) }}>
					<Text style={styles.changeButtonText}>Har du inget konto? Skapa ett</Text>
					<Ionicons name="ios-arrow-round-forward" size={30} color="#2196F3"/>
				</TouchableOpacity>
			)}
		</View>
	);
};

Login.navigationOptions = {
	title: "Logga in",
	...navStyles
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "center",
		width: "100%"
	},
	inputView: {
		width: "100%",
		position: "relative",
	},
	item: {
		marginVertical: 20,
	},
	input: {
		marginVertical: 10,
		paddingHorizontal: 20,
		paddingRight: 10,
		paddingLeft: 60,
		borderWidth: 2,
		width: "100%",
		height: 60,
		borderColor: "#000",
		borderRadius: 50,
		fontSize: 16
	},
	inputIcon: {
		position: "absolute", 
		left: 25, 
		top: 27.5
	},
	button: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 10,
		textAlign: "center",
		width: "100%",
		height: 60,
		borderRadius: 50,
		borderWidth: 0,
		borderColor: "#6FB556",
		backgroundColor: "#6FB556"
	},
	errorMessage: {
		fontSize: 12,
		color: "#FF3355",
		backgroundColor: "#FEE0E0",
		width: "100%",
	},
	hideMessage: {
		display: "none"
	},
	changeButton: {
		flexGrow: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		position: "absolute",
		bottom: 20
	},
	changeButtonText: {
		fontSize: 18,
		marginRight: 12,
		marginBottom: 4,
		color: "#2196F3"
	}
});

export default Login;
