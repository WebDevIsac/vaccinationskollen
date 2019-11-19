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
import { GET_VACCINATIONS_AND_CHILD_QUERY, GET_FAMILY_VACCINATIONS_QUERY } from "../utils/Queries";
import { NEW_VACCINATION_SUBSCRIPTION } from "../utils/Subscriptions";

const VaccinationList = (props) => {

	const [orderBy, setOrderBy] = useState(null);
	const [childId, setChildId] = useState(null);
	const [userVaccinations, setUserVaccinations] = useState([]);

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

	const subscribeToNewVaccination = subscribeToMore => {
		subscribeToMore({
			document: NEW_VACCINATION_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				// console.log(prev);
				const newVaccination = subscriptionData.data.newVaccination;
				console.log(newVaccination);
			}
		})
	}
	
	return (
		<Query query={GET_VACCINATIONS_AND_CHILD_QUERY} variables={{ v: Math.random() }} fetchPolicy='cache-and-network'>
			{({ loading, err, data, refetch, subscribeToMore }) => {
				if (err) return console.log(err);
				if (loading) return <LoadingIndicator />

				subscribeToNewVaccination(subscribeToMore);

				setUserVaccinations(sortVaccinations(data.getUserVaccinations, orderBy));

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
									placeholderTextColor="#FFF"
									placeholder={{
										label: "Sortera efter...",
										value: null
									}}
									style={pickerSelectStyles}
									onValueChange={async (value) => {
										if (userVaccinations.length > 0) {
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
									await refetch();
								}}
								value={childId ? childId : null}
								items={children}
								Icon={() => {
									return <Chevron size={1.5} color="gray" />
								}}
							/>
						</View>
						{userVaccinations.length === 0 && (
							<View style={styles.emptyMessageContainer}>
								<Text style={styles.emptyMessage}>{childId ? children.find(child => child.value === childId).label : "Du"} har inte lagt till några vaccinationer ännu.</Text>
							</View>
						)}
						<View style={styles.vaccinationListContainer}>
							{userVaccinations.map((vaccination, index) => {
								return (
									<VaccinationCard update={userVaccinations[index]} key={vaccination.id} vaccination={vaccination} refetch={refetch} queryToRefetch={GET_FAMILY_VACCINATIONS_QUERY} />
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
		backgroundColor: "lightblue",
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
		color: "#FFF",
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
		color: "#FFF",
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
		borderWidth: 1,
		borderColor: "gray",
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
		borderWidth: 0.5,
		borderColor: "purple",
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
