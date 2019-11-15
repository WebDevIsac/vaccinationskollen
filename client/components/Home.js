import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import navStyles from "../styles/navStyles";
import LoadingIndicator from "./LoadingIndicator";
import SortAllVaccinations from "./SortAllVaccinations";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_USER_QUERY = gql`
	query getUserQuery {
		getUser {
			name
		}
	}
`;

const Home = (props) => {
	const { firstTime } = props.screenProps;
	
	return (
		<Query query={GET_USER_QUERY}>
			{({ loading, err, data }) => {
				if (err) {console.log(err); return null}
				if (loading) return <LoadingIndicator />
				else {

					
					let welcomeMessage = `Välkommen ${firstTime ? "" : "tillbaka"} ${data.getUser.name}`;
					
					return (
						<ScrollView contentContainerStyle={styles.container}>
							<Text style={styles.welcomeText}>{welcomeMessage}</Text>
							<SortAllVaccinations order="fill" />
							<SortAllVaccinations order="protect" />
							<SortAllVaccinations order="taken" />
						</ScrollView>
					)
				}
			}}
		</Query>
	)
}

Home.navigationOptions = {
	title: "Hem",
	...navStyles
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexGrow: 1,
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "space-between",
	},
	welcomeText: {
		fontSize: 24,
		marginVertical: 20,
		textTransform: "capitalize"
	}
});

export default Home;