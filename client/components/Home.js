import React, { useState } from "react";
import { Text, StyleSheet, ScrollView, Button, ActivityIndicator } from "react-native";
import navStyles from "../styles/navStyles";
import LoadingIndicator from "./LoadingIndicator";
import SortAllVaccinations from "./SortAllVaccinations";

const Home = (props) => {

	const { firstTime } = props.screenProps;
	// let welcomeMessage = `Välkommen ${firstTime ? "" : "tillbaka "} ${data.getFamilyVaccinations.user.name}`;
	let welcomeMessage = "Välkommen";

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text>{welcomeMessage}</Text>
			<SortAllVaccinations order="fill" client={props.client}/>
			<SortAllVaccinations order="taken" client={props.client}/>
			<SortAllVaccinations order="protect" client={props.client}/>
		</ScrollView>
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
		justifyContent: "space-between",
	},
});

export default Home;