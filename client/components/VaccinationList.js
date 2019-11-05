import React, { useState } from 'react';
import { Header } from "react-navigation-stack";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import navStyles from "../styles/navStyles";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_USER_VACCINATIONS_QUERY = gql`
	query getUserVaccinationsQuery {
		getUserVaccinations {
			id
			takenAt
			createdAt
			type {
				name
				dose
				untilNext
				protectDuration
			}
		}
	}
`;

const VaccinationList = (props) => {


	return (
		<Query query={GET_USER_VACCINATIONS_QUERY}>
			{({ loading, err, data }) => {
				if (err) return console.log(err);
				if (loading) return <ActivityIndicator/>

				let updateVaccinations = data.getUserVaccinations.map(vaccination => {
					if (vaccination.takenAt) {
						vaccination.takenAt = vaccination.takenAt.split("T");
						vaccination.takenAt = vaccination.takenAt[0];
					}

					vaccination.createdAt = vaccination.createdAt.split("T");
					vaccination.createdAt = vaccination.createdAt[0];

					return vaccination;
				});


				return (
					<ScrollView contentContainerStyle={styles.container}>
						{updateVaccinations.map(vaccination => {
							return (
								<View key={vaccination.id} style={styles.vaccinationItem}>
									<Text>Vaccination: {vaccination.type.name}</Text>
									<Text>Dos: {vaccination.type.dose}</Text>
									<Text>Tagen: {vaccination.takenAt}</Text>
									<Text>Tillagd: {vaccination.createdAt}</Text>
								</View>
							)
						})}
					</ScrollView>
				)
			}}
		</Query>
	)
}

VaccinationList.navigationOptions = {
	title: "Dina Vaccinationer",
	...navStyles
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "space-around"
	},
	vaccinationItem: {
		flex: 1,
		// height: 120,
		width: 240,
		borderWidth: 2,
		borderColor: "#E13205",
		borderRadius: 5,
		marginVertical: 10,
		padding: 10,
	}
})

export default VaccinationList;
