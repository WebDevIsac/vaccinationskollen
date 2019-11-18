import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import navStyles from "../styles/navStyles";
import { sortVaccinations } from "../utils/sortUtils";
import LoadingIndicator from "./LoadingIndicator";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import VaccinationCard from "./VaccinationCard";

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
	
	return (
		<Query query={GET_FAMILY_VACCINATIONS_QUERY}>
			{({ loading, err, data, refetch }) => {
				if (err) {console.log(err); return null}
				if (loading) return <LoadingIndicator />

				refetch();

				let allVaccinations = data.getFamilyVaccinations;
				
				let welcomeMessage = `Välkommen ${firstTime ? "" : "tillbaka"} ${data.getUser.name}`;

				let sortNextDose = sortVaccinations(allVaccinations, "nextDose_ASC", 3);
				let sortProtectUntil = sortVaccinations(allVaccinations, "protectUntil_ASC", 3);
				let sortTakenAt = sortVaccinations(allVaccinations, "takenAt_DESC", 3);
				
				return (
					<ScrollView contentContainerStyle={styles.container}>
						<Text style={styles.welcomeText}>{welcomeMessage}</Text>
						{allVaccinations.length === 0 && <Text>Du har inga tillagda vaccinationer</Text>}
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