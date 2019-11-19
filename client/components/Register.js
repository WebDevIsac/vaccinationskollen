import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button, AsyncStorage, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { Item, Label, Input } from "native-base";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { AUTH_TOKEN } from "../utils/constants";
import { signIn, getToken } from "../utils/loginUtils";
import navStyles from "../styles/navStyles";
import { Ionicons } from "@expo/vector-icons";
import { Appearance } from "react-native-appearance";
import { Chevron } from "react-native-shapes";
import DateTimePicker from "react-native-modal-datetime-picker";

import { translateDate, setCorrectHours } from "../utils/dateUtils";

const SIGNUP_MUTATION = gql`
	mutation SignupMutation($name: String!, $email: String!, $password: String!, $born: DateTime!) {
		signup(name: $name, email: $email, password: $password, born: $born) {
			token
		}
	}
`;

const colorScheme = Appearance.getColorScheme();
const isDarkModeEnabled = colorScheme === 'dark';

const Register = ({screenProps}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState();
	const [bornDate, setBornDate] = useState(translateDate(new Date()));
	const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);


	const confirm = async (data) => {
		const { token } = data.signup;
		await signIn(token);
		screenProps.updateToken();
		screenProps.setFirstTime(true);
	};

	let inputRefs = {
		name: undefined,
		email: undefined,
		password: undefined
	}
	

	return (
		<View style={styles.container}>
			<Mutation 
				mutation={SIGNUP_MUTATION} 
				variables={{ name, email, password, born: setCorrectHours(new Date(bornDate)) }}
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
							<View style={{width: "90%", marginTop: 20}}>
								<Item floatingLabel style={styles.item}>
									<Label>
										<Ionicons name="ios-person" size={25} color="gray" style={styles.inputIcon} /> Namn
									</Label>
									<Input
										getRef={input => inputRefs.name = input}
										returnKeyType="next"
										onSubmitEditing={() => inputRefs.email._root.focus()}
										textContentType="name"
										onChangeText={text => setName(text)}
										value={name}
									/>
								</Item>
								<Item floatingLabel style={[styles.item, emailError && {borderWidth: 1, borderColor: "#FF3355"}]}>
									<Label>
										<Ionicons name="ios-mail" size={25} color="gray" style={styles.inputIcon} /> Email
									</Label>
									<Input
										getRef={input => inputRefs.email = input}
										returnKeyType="next"
										onSubmitEditing={() => inputRefs.password._root.focus()}
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
										getRef={input => inputRefs.password = input}
										returnKeyType="next"
										onSubmitEditing={() => setIsDateTimePickerVisible(true)}
										secureTextEntry={true}
										textContentType="password"
										onChangeText={text => setPassword(text)}
										value={password}
									/>
								</Item>
								<View style={styles.dateInputView}>
									<Label>
										<Ionicons name="ios-calendar" size={25} color="gray" /> Födelsedatum
									</Label>
									<TouchableOpacity
										onPress={() => setIsDateTimePickerVisible(true)}
										style={{ position: "relative" }}
									>
										<TextInput
											value={bornDate.toString()}
											pointerEvents="none"
											style={styles.dateInput}
										/>
										<Chevron size={1.5} color="gray" style={styles.chevronIcon} />
									</TouchableOpacity>
								</View>
								<DateTimePicker
									titleIOS="Välj födelsedatum"
									cancelTextIOS="Avbryt"
									confirmTextIOS="Klar"
									date={new Date(bornDate)}
									isVisible={isDateTimePickerVisible}
									onConfirm={(data) => {
										let translatedDate = translateDate(data);
										setBornDate(translatedDate);
										setIsDateTimePickerVisible(false);
									}}
									onCancel={() => setIsDateTimePickerVisible(false)}
									isDarkModeEnabled={isDarkModeEnabled}
								/>
								<TouchableOpacity style={styles.button} onPress={() => {
									mutation();
								}}>
									<Text style={styles.buttonText}>Skapa konto</Text>
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
		justifyContent: "space-between",
		width: "100%"
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
	chevronIcon: {
		position: "absolute",
		top: 24,
		right: 12,
	},
	dateInput: {
		fontSize: 16,
		paddingVertical: 8,
		paddingHorizontal: 8,
		marginVertical: 8,
		borderBottomWidth: 1,
		borderColor: "lightgray",
		color: "black",
		paddingRight: 30, 
		width: "100%",
		height: 40
	},
	dateInputView: {
		marginVertical: 8,
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
	buttonText: {
		fontSize: 18, 
		color: "#FFF"
	},
	errorMessage: {
		marginTop: 8,
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

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 8,
		paddingHorizontal: 8,
		marginVertical: 8,
		borderWidth: 1,
		borderColor: "lightgray",
		borderRadius: 4,
		color: "black",
		paddingRight: 30, // to ensure the text is never behind the icon
		width: "100%",
		height: 40
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: "lightgray",
		borderRadius: 8,
		color: "black",
		paddingRight: 30, // to ensure the text is never behind the icon
		width: "100%",
		height: 40
	},
	iconContainer: {
		top: 24,
		right: 12
	},
});

export default Register;
