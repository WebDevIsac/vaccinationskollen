import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { signOut } from "../loginUtils";

const Home = (props) => {
	return (
		<View style={styles.container}>
			<Button
				title="Logout"
				onPress={() => {
					signOut();
					props.screenProps.updateToken();
				}}
			/>
		</View>
	)
}

Home.navigationOptions = {
	title: "Home",
	headerStyle: {
		backgroundColor: "#373142"
	},
	headerTitleStyle: {
		color: "#FFF"
	},
	headerBackTitle: {
		color: "#82D8D8"
	},
	headerTintColor: "#82D8D8"
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "center"
	}
});

export default Home;