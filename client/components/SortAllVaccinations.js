import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import LoadingIndicator from './LoadingIndicator';
import VaccinationCard from './VaccinationCard';

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

const SortAllVaccinations = ({order}) => {

	let orderBy;
	const first = 3;

	let message;

	if (order == "fill") {
		orderBy = "nextDose_ASC"
		message = "Vaccinationer som snart ska tas igen"
	} else if (order == "protect") {
		orderBy = "protectUntil_ASC"
		message = "Dessa vaccinationsskydd går ut snart"
	} else if (order == "taken") {
		orderBy = "takenAt_DESC"
		message = "Nyligen tagna vaccinationer"
	}

	return (
		<Query query={GET_SORTED_VACCINATIONS_QUERY} variables={{ orderBy: orderBy, first: first }}>
			{({ loading, err, data, refetch }) => {
				if (err) {console.log(err); return null;}
				if (loading) return <LoadingIndicator />

				refetch();

				return (
					<View style={styles.container}>
						{!data.getFamilyVaccinations && <Text>Du har inga tillagda vaccinationer</Text>}
						{data.getFamilyVaccinations && <Text style={styles.sortTypeText}>{message}</Text>}
						{data.getFamilyVaccinations.map(vaccination => {
							return (
								<VaccinationCard key={vaccination.id} vaccination={vaccination} />
							)
						})}
					</View>
				)
			}}
		</Query>
	)
}

const styles = StyleSheet.create({
	container: {
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
})

export default SortAllVaccinations
