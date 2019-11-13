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

	let orderBy;
	const first = 3;

	if (order === "fill") {
		orderBy = "nextDose_ASC"
	} else if (order === "taken") {
		orderBy = "takenAt_DESC"
	} else if (order === "protect") {
		orderBy = "protectUntil_ASC"
	}

	let message;

	if (order == "fill") {
		message = "Vaccinationer som snart ska tas igen"
	} else if (order == "taken") {
		message = "Nyligen tagna vaccinationer"
	} else if (order == "protect") {
		message = "Vaccinationer som bör kollas över"
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
						{data.getFamilyVaccinations && <Text>{message}</Text>}
						{data.getFamilyVaccinations.map(vaccination => {
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
			}}
		</Query>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "60%",
		flex: 1,
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "space-between",
	},
})

export default SortAllVaccinations
