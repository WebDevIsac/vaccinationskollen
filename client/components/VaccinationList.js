import React, { useState, useEffect } from 'react';
import { Header } from "react-navigation-stack";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { Chevron } from "react-native-shapes";
import navStyles from "../styles/navStyles";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import RNPickerSelect from "react-native-picker-select";
import { translateDate, setCorrectHours } from "../utils/dateUtils";
import LoadingIndicator from './LoadingIndicator';

const GET_USER_VACCINATIONS_QUERY = gql`
	query getUserVaccinationsQuery($orderBy: VaccinationOrderByInput) {
		getUserVaccinations(orderBy: $orderBy) {
			id
			takenAt
			createdAt
			type {
				name
				dose
			}
		}
	}
`;

const VaccinationList = (props) => {

	const [orderBy, setOrderBy] = useState();
	const [refetchSorting, setRefetchSorting] = useState(false);
	const [userVaccinations, setUserVaccinations] = useState([]);

	const sortingOpts = [
		{ value: "takenAt_DESC", label: "Senast tagna" },
		{ value: "takenAt_ASC", label: "Först tagna" },
		{ value: "createdAt_DESC", label: "Senast tillagda" },
		{ value: "createdAt_ASC", label: "Först tillagda" },
		{ value: "nextDose_DESC", label: "Kortast till nästa dos" },
		{ value: "nextDose_ASC", label: "Längst till nästa dos" },
		{ value: "protectUntil_DESC", label: "Kortast skydd kvar" },
		{ value: "protectUntil_ASC", label: "Längst skydd kvar" },
	];

	const executeSorting = async () => {
		const result = await props.screenProps.client.query({
			query: GET_USER_VACCINATIONS_QUERY,
			variables: orderBy
		});
		const sortedUserVaccinations = result.data.getUserVaccinations;
		setUserVaccinations(sortedUserVaccinations)
	}

	return (
		<Query query={GET_USER_VACCINATIONS_QUERY} variables={orderBy}>
			{({ loading, err, data, refetch }) => {
				if (err) return console.log(err);
				if (loading) return <LoadingIndicator />
				else executeSorting();
				
				if (props.navigation.getParam("refetch")) executeSorting();

				return (
					<ScrollView contentContainerStyle={styles.container}>
						<View style={styles.filterView}>
							<TextInput style={styles.filterText} placeholder="Sök" placeholderTextColor="#FFF" />
							<View style={styles.filterLine}></View>
							<RNPickerSelect
								placeholderTextColor="#FFF"
								placeholder={{
									label: "Sortera efter...",
									value: null
								}}
								style={pickerSelectStyles}
								onValueChange={value => {
									setOrderBy({orderBy: value});
									setRefetchSorting(true);
									executeSorting();
								}}
								value={orderBy ? orderBy.orderBy : null}
								items={sortingOpts}
								Icon={() => {
									return <Chevron size={1.5} color="gray" />;
								}}
							/>
						</View>
						{!userVaccinations && <Text>Du har inte lagt till några vaccinationer ännu. </Text>}
						{userVaccinations.map(vaccination => {
							return (
								<View key={vaccination.id} style={styles.vaccinationItem}>
									<Text>Vaccination mot {vaccination.type.name}</Text>
									<Text>Dos {vaccination.type.dose}</Text>
									<Text>Tagen: {vaccination.takenAt}</Text>
									<Text>Tillagd: {vaccination.createdAt}</Text>
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
		position: "relative",
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "90%",
		height: 60,
		backgroundColor: "gray",
	},
	filterText: {
		fontSize: 18,
		paddingHorizontal: 10,
		width: "45%",
		color: "#FFF"
	},
	filterLine: {
		width: 1, 
		height: "100%", 
		backgroundColor: "black",
		position: "absolute",
		top: 0,
		left: "50%",
	},
	vaccinationItem: {
		flex: 1,
		height: 120,
		width: "90%",
		backgroundColor: "#FEE0E0",
		borderWidth: 0,
		borderRadius: 20,
		padding: 10,
	},
	addButton: {
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
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 8,
		paddingHorizontal: 8,
		marginVertical: 8,
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 4,
		color: "#FFF",
		paddingRight: 30, // to ensure the text is never behind the icon
		width: "100%",
		height: 40
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: "purple",
		borderRadius: 8,
		color: "#FFF",
		paddingRight: 30, // to ensure the text is never behind the icon
		width: "100%",
		height: 40
	},
	iconContainer: {
		top: 24,
		right: 12
	},
});

export default VaccinationList;
