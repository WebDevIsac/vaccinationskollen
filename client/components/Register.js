import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button, AsyncStorage, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { AUTH_TOKEN } from "../constants";
import { signIn, getToken } from "../loginUtils";
import navStyles from "../styles/navStyles";
import { Ionicons } from "@expo/vector-icons";

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
							<View style={{width: "90%"}}>
								<View style={styles.inputView}>
									<Ionicons name="ios-person" size={25} color="gray" style={styles.inputIcon} />
									<TextInput
										style={styles.input}
										textContentType="name"
										placeholder="Your name"
										onChangeText={text => setName(text)}
										value={name}
									/>
								</View>
								<View style={styles.inputView}>
									<Ionicons name="ios-mail" size={25} color="gray" style={styles.inputIcon} />
									<TextInput
										style={[styles.input, emailError && {borderColor: "#FF3355"}]}
										textContentType="emailAddress"
										placeholder="Your email"
										onChangeText={text => setEmail(text)}
										value={email}
									/>
								</View>
								<Text style={emailError ? styles.errorMessage : styles.hideMessage}>{emailError}</Text>
								<View style={styles.inputView}>
									<Ionicons name="ios-lock" size={25} color="gray" style={styles.inputIcon} />
									<TextInput
										style={styles.input}
										textContentType="password"
										placeholder="Your password"
										onChangeText={text => setPassword(text)}
										value={password}
									/>
								</View>
								<TouchableOpacity style={styles.button} onPress={() => {
									mutation();
								}}>
									<Text style={{ fontSize: 18, color: "#FFF" }}>Skapa konto</Text>
								</TouchableOpacity>
							</View>
						)
					}
					
				}}
			</Mutation>
			{!isLoading && (
				<TouchableOpacity style={styles.changeButton} onPress={() => { screenProps.setLogin(true) }}>
					<Text style={styles.changeButtonText}>Har du redan ett konto? Logga in</Text>
					<Ionicons name="ios-arrow-round-forward" size={30} color="#2196F3"/>
				</TouchableOpacity>
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
		justifyContent: "center",
		width: "100%"
	},
	inputView: {
		width: "100%",
		position: "relative",
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
		width: 240,
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

export default Register;
