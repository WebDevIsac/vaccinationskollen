import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { signOut, getToken } from "./loginUtils";
import Login from "./components/Login";

const Home = (props) => {
	return (
		<View style={styles.container}>
			<Button
				title="Logout"
				onPress={() => {
					signOut();
					props.screenProps();
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "center"
	}
});

const AppNavigator = createStackNavigator({
	Home: Home
});

const Navigator = createAppContainer(AppNavigator);


const NavWrapper = () => {
	const [token, setToken] = useState(null);

	const updateToken = async () => {
		let thisToken = await getToken();
		setToken(thisToken);
	}

	updateToken();
	
	// if (loading) return <ActivityIndicator size="large" />
	if (!token) return <Login updateToken={updateToken}/>

	return <Navigator screenProps={updateToken}/>
}

export default NavWrapper;