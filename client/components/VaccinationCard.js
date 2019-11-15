import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { translateDate } from '../utils/dateUtils';

const VaccinationCard = ({vaccination}) => {

	let { type, takenAt, createdAt, nextDose, protectUntil, child } = vaccination;

	takenAt = takenAt && translateDate(new Date(takenAt));
	createdAt = createdAt && translateDate(new Date(createdAt));
	nextDose = nextDose && translateDate(new Date(nextDose));
	protectUntil = protectUntil && translateDate(new Date(protectUntil));

	return (
		<View style={styles.vaccinationItem}>
			<Text>Vacinationstagare: {child ? child.name : "Jag"}</Text>
			<Text>Vaccination mot {type.name}</Text>
			<Text>Dos {type.dose}</Text>
			{nextDose && <Text>Nästa dos ska tas: {nextDose}</Text>}
			{protectUntil && <Text>Denna dosen skyddar tills: {protectUntil}</Text>}
			<Text>Tagen: {takenAt}</Text>
			<Text>Tillagd: {createdAt}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	vaccinationItem: {
		flex: 1,
		maxHeight: 150,
		width: "90%",
		backgroundColor: "#FEE0E0",
		borderWidth: 0,
		borderRadius: 20,
		padding: 10,
		marginVertical: 10,
	},
})

export default VaccinationCard
