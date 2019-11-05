import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { signOut } from "../loginUtils";
import navStyles from "../styles/navStyles";

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
				title="Dina Vaccinationer"
				onPress={() => props.navigation.navigate("VaccinationList")}
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
	title: "Hem",
	...navStyles
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