import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Text, Alert } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { withApollo } from "react-apollo";
import { getToken, signOut } from "./utils/loginUtils";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "./components/Login";
import RegisterScreen from "./components/Register";
import HomeScreen from "./components/Home";
import ProfileScreen from "./components/Profile";
import NewVaccinationScreen from "./components/NewVaccination";
import VaccinationListScreen from "./components/VaccinationList";
import AddChildScreen from "./components/AddChild";

const SignOutFunction = props => {
	Alert.alert("Logga ut", "Är du säker på att du vill logga ut?", [
		{
			text: "Ja, logga ut",
			onPress: () => {
				signOut();
				props.updateToken();
				props.client.resetStore();
			}
		},
		{
			text: "Nej, stanna kvar"
		}
	]);
};

const HomeStack = createStackNavigator({
	Home: withApollo(HomeScreen),
	AddChild: AddChildScreen
});

const VaccinationListStack = createStackNavigator({
	VaccinationList: VaccinationListScreen,
});

const NewVaccinationStack = createStackNavigator({
	NewVaccination: NewVaccinationScreen
});

const SignOutScreen = () => {};

const LoginStack = createStackNavigator({
	Login: LoginScreen
});

const RegisterStack = createStackNavigator({
	Register: RegisterScreen
});


const BottomNavigator = createBottomTabNavigator(
	{
		Home: {
			screen: HomeStack,
			navigationOptions: ({ screenProps }) => ({
				title: "Hem",
				props: screenProps,
			})
		},
		NewVaccination: {
			screen: NewVaccinationStack,
			navigationOptions: {
				title: "Ny Vaccination"
			}
		},
		VaccinationList: {
			screen: VaccinationListStack,
			navigationOptions: {
				title: "Vaccinationer"
			}
		},
		SignOut: {
			screen: withApollo(SignOutScreen),
			navigationOptions: ({ screenProps }) => ({
				title: "Logga Ut",
				tabBarOnPress: () => SignOutFunction(screenProps)
			})
		}
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === "Home") {
					iconName = "ios-home";
				} else if (routeName === "Profile") {
					iconName = "ios-person";
				} else if (routeName === "SignOut") {
					iconName = "ios-log-out"
				} else if (routeName === "NewVaccination") {
					iconName = "ios-add-circle";
				} else if (routeName === "VaccinationList") {
					iconName = "ios-list-box";
				}

				return <Ionicons name={iconName} size={25} color={tintColor} />;
			}
		}),
		tabBarOptions: {
			activeTintColor: "#E13205",
			inactiveTintColor: "#D3D3D3"
		}
	}
);

const AppContainer = createAppContainer(BottomNavigator);
const LoginContainer = createAppContainer(LoginStack);
const RegisterContainer = createAppContainer(RegisterStack);

const NavWrapper = ({ client }) => {
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);
	const [login, setLogin] = useState(true);
	const [firstTime, setFirstTime] = useState(false);

	useEffect(() => {
		updateToken();
	}, []);

	const updateToken = async () => {
		let thisToken = await getToken();
		setToken(thisToken);
		setLoading(false);
	};

	if (loading) return <ActivityIndicator size="large" />;
	if (!token && login)
		return <LoginContainer screenProps={{ updateToken, setLogin, setFirstTime }} />;
	if (!token && !login)
		return <RegisterContainer screenProps={{ updateToken, setLogin, setFirstTime }} />;
	return <AppContainer screenProps={{ updateToken, client, firstTime }} />;
};

export default withApollo(NavWrapper);
