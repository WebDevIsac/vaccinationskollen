import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { getToken } from "./loginUtils";

import LoginScreen from "./components/Login";
import RegisterScreen from "./components/Register";
import HomeScreen from "./components/Home";

const HomeStack = createStackNavigator({
	Home: HomeScreen
});

const LoginStack = createStackNavigator({
	Login: LoginScreen
});

const RegisterStack = createStackNavigator({
	Register: RegisterScreen
});

const HomeContainer = createAppContainer(HomeStack);
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
	return <HomeContainer screenProps={{updateToken}}/>
}
const styles = StyleSheet.create({
	container: {
		top: 0,
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "center"
	}
});

export default NavWrapper;