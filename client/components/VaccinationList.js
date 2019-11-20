import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Chevron } from "react-native-shapes";
import navStyles from "../styles/navStyles";
import { Query } from "react-apollo";
import RNPickerSelect from "react-native-picker-select";
import LoadingIndicator from './LoadingIndicator';
import VaccinationCard from './VaccinationCard';
import { Ionicons } from "@expo/vector-icons";
import { sortVaccinations } from "../utils/sortUtils";
import { TEST_QUERY_ALL_VACCINATIONS, GET_FAMILY_VACCINATIONS_QUERY } from "../utils/Queries";
import { NEW_VACCINATION_SUBSCRIPTION } from "../utils/Subscriptions";

const VaccinationList = (props) => {

	const [orderBy, setOrderBy] = useState(null);
	const [childId, setChildId] = useState(null);

	const sortingOpts = [
		{ value: "takenAt_DESC", label: "Senast tagna" },
		{ value: "takenAt_ASC", label: "Först tagna" },
		{ value: "createdAt_DESC", label: "Senast tillagda" },
		{ value: "createdAt_ASC", label: "Först tillagda" },
		{ value: "nextDose_ASC", label: "Kortast till nästa dos" },
		{ value: "nextDose_DESC", label: "Längst till nästa dos" },
		{ value: "protectUntil_ASC", label: "Kortast skydd kvar" },
		{ value: "protectUntil_DESC", label: "Längst skydd kvar" },
	];

	let allVaccinations = [];

	return (
		<Query query={TEST_QUERY_ALL_VACCINATIONS} variables={{ v: Math.random() }} fetchPolicy='cache-and-network'>
			{({ loading, err, data, refetch }) => {
				if (err) return console.log(err);
				if (loading) return <LoadingIndicator />

				allVaccinations = sortVaccinations(data.getFamilyVaccinations, orderBy);
				
				allVaccinations = allVaccinations.filter(vaccination => {
					if (childId) {
						if (vaccination.child) {
							if (vaccination.child.id == childId) {
								return vaccination;
							}
						}
					} else {
						if (vaccination.child === null) {
							return vaccination;
						}
					}
				});


				let children = data.getChild.map(child => {
					child = {
						value: child.id,
						label: child.name
					}
					return child;
				});


				return (
					<ScrollView contentContainerStyle={styles.container}>
						<View style={styles.topContainer}>
							<View style={styles.filterView}>
								<RNPickerSelect
									placeholderTextColor="gray"
									placeholder={{
										label: "Sortera efter...",
										value: null
									}}
									style={pickerSelectStyles}
									onValueChange={async (value) => {
										if (allVaccinations.length > 0) {
											await setOrderBy(value);
										}
									}}
									value={orderBy ? orderBy : null}
									items={sortingOpts}
								/>
							</View>
							<RNPickerSelect 
								placeholderTextColor="#000"
								placeholder={{
									label: "Mina vaccinationer",
									value: null
								}}
								style={pickerSelectStylesColor}
								onValueChange={async (value) => {
									await setChildId(value);
								}}
								value={childId ? childId : null}
								items={children}
								Icon={() => {
									return <Chevron size={1.5} color="gray" />
								}}
							/>
						</View>
						{allVaccinations.length === 0 && (
							<View style={styles.emptyMessageContainer}>
								<Text style={styles.emptyMessage}>{childId ? children.find(child => child.value === childId).label : "Du"} har inte lagt till några vaccinationer ännu.</Text>
							</View>
						)}
						<View style={styles.vaccinationListContainer}>
							{allVaccinations.map((vaccination, index) => {
								return (
									<VaccinationCard update={allVaccinations[index]} key={vaccination.id} vaccination={vaccination} refetch={refetch} queryToRefetch={GET_FAMILY_VACCINATIONS_QUERY} />
								)
							})}
						</View>
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
	title: "Mina Vaccinationer",
	...navStyles
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
	},
	topContainer: {
		width: "100%",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	filterView: {
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: 60,
		backgroundColor: "#FEE0E0",
	},
	emptyMessageContainer: {
		flex: 1,
		width: "80%",
		justifyContent: "flex-end",
		alignItems: "center"
	},
	emptyMessage: {
		fontSize: 18,
		textAlign: "center",
		marginBottom: 10
	},
	vaccinationListContainer: {
		flex: 1,
		width: "100%",
		alignItems: "center"
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
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 8,
		paddingHorizontal: 8,
		marginVertical: 8,
		borderWidth: 0,
		color: "#000",
		paddingRight: 30,
		width: "80%",
		height: 40,
		alignSelf: "center",
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0,
		color: "#000",
		paddingRight: 30,
		width: "80%",
		height: 40,
		alignSelf: "center"
	},
	iconContainer: {
		top: 24,
		right: "20%"
	},
});

const pickerSelectStylesColor = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 8,
		paddingHorizontal: 8,
		marginVertical: 16,
		borderBottomWidth: 1,
		borderColor: "lightgray",
		borderRadius: 4,
		color: "#000",
		paddingRight: 30,
		width: "80%",
		height: 40,
		alignSelf: "center"
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderBottomWidth: 0.5,
		borderColor: "lightgray",
		borderRadius: 8,
		color: "#000",
		paddingRight: 30,
		width: "80%",
		height: 40,
		alignSelf: "center"
	},
	iconContainer: {
		top: 32,
		right: "15%"
	},
});

export default VaccinationList;
