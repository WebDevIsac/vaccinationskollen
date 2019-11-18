import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { translateDate } from '../utils/dateUtils';
import { Ionicons } from "@expo/vector-icons";
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";
import LoadingIndicator from './LoadingIndicator';

const DELETE_USER_VACCINATION_MUTATION = gql`
	mutation DeleteUserVaccinationMutation($id: ID!) {
		deleteUserVaccination(id: $id) {
			id
		}
	}
`;

const VaccinationCard = ({vaccination, refetch}) => {

	let { id, type, takenAt, createdAt, nextDose, protectUntil, child } = vaccination;

	takenAt = takenAt && translateDate(new Date(takenAt));
	createdAt = createdAt && translateDate(new Date(createdAt));
	nextDose = nextDose && translateDate(new Date(nextDose));
	protectUntil = protectUntil && translateDate(new Date(protectUntil));

	return (
		<Mutation 
			mutation={DELETE_USER_VACCINATION_MUTATION}
			variables={{ id }}
			onError={({ graphQLErrors }) => {
				graphQLErrors.map(err => {
					console.log(err);
				})
			}}
			onCompleted={() => refetch()}
		>
			{( mutation, { loading, err, data }) => {
				if (loading) return <LoadingIndicator />
				if (err) { console.log(err); return null;}

				return (
					<View style={styles.vaccinationItem}>
						<Text>Vacinationstagare: {child ? child.name : "Jag"}</Text>
						<Text>Vaccination mot {type.name}</Text>
						<Text>Dos {type.dose}</Text>
						{nextDose && <Text>Nästa dos ska tas: {nextDose}</Text>}
						{protectUntil && <Text>Denna dosen skyddar tills: {protectUntil}</Text>}
						<Text>Tagen: {takenAt}</Text>
						<Text>Tillagd: {createdAt}</Text>
						<TouchableOpacity style={styles.trashIcon} onPress={() => {
							Alert.alert("Ta bort vaccination", "Vill du ta bort den här vaccinationen?", [
								{
									text: "Nej, avbryt"
								},
								{
									text: "Ja, ta bort",
									onPress: () => mutation()
								},
							])
						}}>
							<Ionicons name="ios-trash" size={25} color="gray" />
						</TouchableOpacity>
					</View>
				)
			}}
		</Mutation>
	)
}

const styles = StyleSheet.create({
	vaccinationItem: {
		position: "relative",
		flex: 1,
		maxHeight: 150,
		width: "90%",
		backgroundColor: "#FEE0E0",
		borderWidth: 0,
		borderRadius: 20,
		padding: 10,
		marginVertical: 10,
	},
	trashIcon: {
		position: "absolute",
		right: 10,
		top: 10
	}
})

export default VaccinationCard
