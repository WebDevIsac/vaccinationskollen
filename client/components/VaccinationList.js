import React, { useState } from 'react';
import { Header } from "react-navigation-stack";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
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
						<View style={styles.filterView}>
							<Text style={styles.filterText}>Sök</Text>
							<View style={{width: 1, height: "100%", backgroundColor: "black"}}></View>
							<Text style={styles.filterText}>Sortera</Text>
						</View>
						{updateVaccinations.map(vaccination => {
							return (
								<View key={vaccination.id} style={styles.vaccinationItem}>
									{/* <View style={styles.vaccinationLeft}>

									</View>
									<View style={styles.vaccinationRight}>

									</View> */}
									<Text>Vaccination mot {vaccination.type.name}</Text>
									<Text>Dos {vaccination.type.dose}</Text>
									<Text>Tagen: {vaccination.takenAt}</Text>
									<Text></Text>
								</View>
							)
						})}
						<TouchableOpacity style={styles.addButton} onPress={() => props.navigation.navigate("NewVaccination") }>
							<Text style={styles.addButtonText}>Lägg till ny vaccination</Text>
						</TouchableOpacity>
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
		justifyContent: "space-around",
		width: "100%"
	},
	filterView: {
		marginTop: 10,
		flexGrow: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		width: "90%",
		height: 60,
		backgroundColor: "gray",
	},
	filterText: {
		fontSize: 18,
	},
	vaccinationItem: {
		flex: 1,
		height: 120,
		width: "90%",
		backgroundColor: "#FEE0E0",
		borderWidth: 0,
		borderRadius: 20,
		marginVertical: 10,
		padding: 10,
	},
	addButton: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 10,
		textAlign: "center",
		width: "90%",
		height: 60,
		borderRadius: 50,
		borderWidth: 0,
		borderColor: "#6FB556",
		backgroundColor: "#6FB556"
	},
	addButtonText: {
		fontSize: 18,
	},
})

export default VaccinationList;
