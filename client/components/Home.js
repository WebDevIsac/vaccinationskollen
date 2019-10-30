import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { signOut } from "../loginUtils";

const Home = (props) => {
	return (
		<View style={styles.container}>
			<Button
				title="Gå till din profil"
				onPress={() => props.navigation.navigate("Profile")}
			/>
			<Button
				title="Ny vaccination"
				onPress={() => props.navigation.navigate("NewVaccination")}
			/>
			<Button
				title="Logout"
				onPress={() => {
					signOut();
					props.screenProps.updateToken();
					props.client.resetStore();
				}}
			/>
		</View>
	)
}

Home.navigationOptions = {
	title: "Home",
	headerStyle: {
		backgroundColor: "#373142",
		borderBottomWidth: 0,
	},
	headerTitleStyle: {
		color: "#FFF"
	},
	headerTintColor: "#82D8D8"
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "center"
	}
});

export default Home;