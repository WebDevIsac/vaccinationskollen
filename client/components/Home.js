import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import navStyles from "../styles/navStyles";
import { sortVaccinations } from "../utils/sortUtils";
import LoadingIndicator from "./LoadingIndicator";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import VaccinationCard from "./VaccinationCard";
import { Ionicons } from "@expo/vector-icons";

const GET_FAMILY_VACCINATIONS_QUERY = gql`
	query GetFamilyVaccinationsQuery {
		getFamilyVaccinations {
			id
			user {
				name
			}
			child {
				name
			}
			type {
				name
				dose
			}
			takenAt
			createdAt
			nextDose
			protectUntil
		}
		getUser {
			id
			name
		}
	}
`;


const Home = (props) => {
	const { firstTime } = props.screenProps;

	let allVaccinations;
	let welcomeMessage;
	let sortNextDose;
	let sortProtectUntil;
	let sortTakenAt;

	return (
		<Query query={GET_FAMILY_VACCINATIONS_QUERY}>
			{({ loading, err, data, refetch }) => {
				if (err) {console.log(err); return null}
				if (loading) return <LoadingIndicator />

				refetch();

				allVaccinations = data.getFamilyVaccinations;
				welcomeMessage = `Välkommen ${firstTime ? "" : "tillbaka"}, ${data.getUser.name}`;
				sortNextDose = sortVaccinations(allVaccinations, "nextDose_ASC", 3);
				sortProtectUntil = sortVaccinations(allVaccinations, "protectUntil_ASC", 3);
				sortTakenAt = sortVaccinations(allVaccinations, "takenAt_DESC", 3);
				
				return (
					<ScrollView contentContainerStyle={styles.container}>
						<Text style={styles.welcomeText}>{welcomeMessage}</Text>
						<TouchableOpacity style={styles.addButton} onPress={() => props.navigation.navigate("NewVaccination") }>
							<Text style={styles.addButtonText}>Lägg till vaccination</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.addButton, { backgroundColor: "lightblue" }]} onPress={() => props.navigation.navigate("AddChild") }>
							<Text style={styles.addButtonText}>Lägg till familjemedlem</Text>
						</TouchableOpacity>
						{allVaccinations.length === 0 && (
						<View style={styles.emptyMessage}>
							<Text style={styles.emptyMessageText}>Du har inga tillagda vaccinationer</Text>
						</View>)}
						{allVaccinations.length > 0 && (
							<View style={{width: "100%"}}>
								<View style={styles.vaccinationContainer}>
									{allVaccinations && <Text style={styles.sortTypeText}>Vaccinationer som snart ska tas igen</Text>}
									{sortNextDose.map(vaccination => {
										return (
											<VaccinationCard key={vaccination.id} vaccination={vaccination} refetch={refetch}/>
										)
									})}
								</View>
								<View style={styles.vaccinationContainer}>
									{allVaccinations && <Text style={styles.sortTypeText}>Dessa vaccinationsskydd går ut snart</Text>}
									{sortProtectUntil.map(vaccination => {
										return (
											<VaccinationCard key={vaccination.id} vaccination={vaccination} refetch={refetch}/>
										)
									})}
								</View>
								<View style={styles.vaccinationContainer}>
									{allVaccinations && <Text style={styles.sortTypeText}>Nyligen tagna vaccinationer</Text>}
									{sortTakenAt.map(vaccination => {
										return (
											<VaccinationCard key={vaccination.id} vaccination={vaccination} refetch={refetch}/>
										)
									})}
								</View>
							</View>
						)}
					</ScrollView>
				)
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
	},
	emptyMessage: {
		flex: 1,
		marginTop: "10%",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%"
	},
	emptyMessageText: {
		textAlign: "center",
		marginTop: "30%",
		fontSize: 18
	},
	addButton: {
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 10,
		textAlign: "center",
		width: "80%",
		height: 60,
		borderRadius: 50,
		borderWidth: 0,
		borderColor: "#6FB556",
		backgroundColor: "#6FB556"
	},
	addButtonText: {
		fontSize: 18,
	},
	vaccinationContainer: {
		width: "100%",
		flex: 1,
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "space-between",
	},
	sortTypeText: {
		fontSize: 18,
		textDecorationLine: "underline"
	}
});

export default Home;