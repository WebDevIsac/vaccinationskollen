import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { signOut, getToken } from "./loginUtils";

import LoginScreen from "./components/Login";
import RegisterScreen from "./components/Register";
import HomeScreen from "./components/Home";

const AppStack = createStackNavigator({
	Home: HomeScreen
});

const LoginStack = createStackNavigator({
	Login: LoginScreen
});

const RegisterStack = createStackNavigator({
	Register: RegisterScreen
});

const AppContainer = createAppContainer(AppStack);
const LoginContainer = createAppContainer(LoginStack);
const RegisterContainer = createAppContainer(RegisterStack);

const NavWrapper = () => {
	
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);
	const [login, setLogin] = useState(true);

	useEffect(() => {
		updateToken();
	}, [])
	
	const updateToken = async () => {
		let thisToken = await getToken();
		setToken(thisToken);
		setLoading(false);
	}
	
	if (loading) return <ActivityIndicator size="large" />
	if (!token && login) return <LoginContainer screenProps={{updateToken, setLogin}} />
	if (!token && !login) return <RegisterContainer screenProps={{updateToken, setLogin}} />

	return <AppContainer screenProps={{updateToken}}/>
}

export default NavWrapper;