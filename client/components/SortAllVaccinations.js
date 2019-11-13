import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import LoadingIndicator from './LoadingIndicator';

const GET_SORTED_VACCINATIONS_QUERY = gql`
	query GetSortedVaccinationsQuery($orderBy: VaccinationOrderByInput, $first: Int) {
		getFamilyVaccinations(orderBy: $orderBy, first: $first) {
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
	}
`;

const SortAllVaccinations = (props) => {

	const { order, client } = props;

	const [vaccinations, setVaccinations] = useState([]);

	let orderBy;
	const first = 3;

	if (order === "fill") {
		orderBy = "nextDose_ASC"
	} else if (order === "taken") {
		orderBy = "takenAt_DESC"
	} else if (order === "protect") {
		orderBy = "protectUntil_ASC"
	}

	const executeSorting = async () => {
		const result = await client.query({
			query: gql`
				query GetSortedVaccinationsQuery($orderBy: VaccinationOrderByInput, $first: Int) {
					getFamilyVaccinations(orderBy: $orderBy, first: $first) {
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
				}
			`,
			variables: {
				orderBy,
				first
			}
		});

		const sortedVaccinations = await result.data.getFamilyVaccinations;
		await setVaccinations(sortedVaccinations);
	}

	executeSorting();

	return (
		<View contentContainerStyle={styles.container}>
			{!vaccinations && <Text>Du har inga tillagda vaccinationer</Text>}
			{vaccinations && <Text>{order}</Text>}
			{vaccinations.map(vaccination => {
				return (
					<View key={vaccination.id} style={{marginVertical: 10}}>
						<Text>Vacciantion: {vaccination.type.name}</Text>
						<Text>Dos: {vaccination.type.dose}</Text>
						<Text>Vaccinationstagare: {vaccination.child ? vaccination.child.name : vaccination.user.name}</Text>
						<Text>Tagen: {vaccination.takenAt}</Text>
						<Text>{vaccination.nextDose && `Nästa dos: ${vaccination.nextDose}`}</Text>
						<Text>{vaccination.protectUntil && `Skyddar tills: ${vaccination.protectUntil}`}</Text>
					</View>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "space-between",
	},
})

export default SortAllVaccinations
