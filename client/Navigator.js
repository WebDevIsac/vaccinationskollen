import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Text, Alert } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { withApollo } from "react-apollo";
import { getToken, signOut } from "./loginUtils";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "./components/Login";
import RegisterScreen from "./components/Register";
import HomeScreen from "./components/Home";
import ProfileScreen from "./components/Profile";
import NewVaccinationScreen from "./components/NewVaccination";
import VaccinationListScreen from "./components/VaccinationList";
import UpdateProfileScreen from "./components/UpdateProfile";

const SignOutFunction = (props) => {
	Alert.alert(
		"Logga ut",
		"Är du säker på att du vill logga ut?",
		[
			{
				text: "Ja, logga ut", 
				onPress: () => {
					signOut();
					props.screenProps.updateToken();
					props.client.resetStore();
				} 
			},
			{
				text: "Nej, stanna kvar",
				onPress: () => {
					props.client.resetStore();
					props.navigation.goBack(null);
				}
			}
		]
	)
	return null;
}

const HomeStack = createStackNavigator({
	Home: withApollo(HomeScreen),
	NewVaccination: NewVaccinationScreen,
});

const ProfileStack = createStackNavigator({
	Profile: ProfileScreen,
	UpdateProfile: UpdateProfileScreen,
	VaccinationList: VaccinationListScreen,
})

const LoginStack = createStackNavigator({
	Login: LoginScreen
});

const RegisterStack = createStackNavigator({
	Register: RegisterScreen
});

const BottomNavigator = createBottomTabNavigator(
	{
		Home: HomeStack,
		Profile: ProfileStack,
		SignOut: withApollo(SignOutFunction)
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === 'Home') {
				iconName = `ios-home${focused ? '' : ''}`;
				} else if (routeName === 'Profile') {
				iconName = `ios-person${focused ? '' : ''}`;
				}
		
				// You can return any component that you like here! We usually use an
				// icon component from react-native-vector-icons
				return <Ionicons name={iconName} size={25} color={tintColor} />;
			},
		}),
		tabBarOptions: {
			activeTintColor: "#E13205",
			inactiveTintColor: 'gray',
		},
	  }
)

const AppContainer = createAppContainer(BottomNavigator);
// const HomeContainer = createAppContainer(HomeStack);
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