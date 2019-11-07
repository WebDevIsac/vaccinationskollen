import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	Button,
	Alert,
	ScrollView,
	TextInput,
	TouchableOpacity
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
// import { DatePicker } from "react-native-woodpicker";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Chevron } from "react-native-shapes";
import navStyles from "../styles/navStyles";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Appearance } from "react-native-appearance";
import { translateDate, setCorrectHours } from "../dateUtils";

const GET_VACCINATIONS_QUERY = gql`
	query getVaccinationsQuery {
		getVaccinations {
			id
			name
			dose
		}
	}
`;

const ADD_USER_VACCINATION = gql`
	mutation AddUserVaccination($vaccinationId: ID!, $takenAt: String) {
		addUserVaccination(vaccinationId: $vaccinationId, takenAt: $takenAt) {
			id
		}
	}
`;

const colorScheme = Appearance.getColorScheme();
const isDarkModeEnabled = colorScheme === 'dark';

const NewVaccination = (props) => {
	const [id, setId] = useState();
	const [date, setDate] = useState(translateDate(new Date()));
	const [doses, setDoses] = useState([{value: "1", label: "Dos 1"}]);
	const [name, setName] = useState();
	const [allVaccinations, setAllVaccinations] = useState();
	const [week, setWeek] = useState();
	const [month, setMonth] = useState();
	const [year, setYear] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

	let weeks = [];
	for (let i = 0; i < 4; i++) {
		weeks.push({ label: (i + 1).toString(), value: (i + 1).toString() });
	}
	let months = [];
	for (let i = 0; i < 12; i++) {
		months.push({ label: (i + 1).toString(), value: (i + 1).toString() });
	}
	let years = [];
	for (let i = 0; i < 50; i++) {
		years.push({ label: (i + 1).toString(), value: (i + 1).toString() });
	}

	useEffect(() => {
		if (allVaccinations) {
			let updateDoses = allVaccinations.filter(item => {
				return item.name === name;
			});

			updateDoses = updateDoses.map(item => {
				return {
					key: item.id,
					value: item.id,
					label: `Dos ${item.dose}`,
					name: item.name
				};
			});
			setDoses(updateDoses);
		}
	}, [name]);

	return (
		<View style={styles.container}>
			<Query query={GET_VACCINATIONS_QUERY}>
				{({ loading, err, data }) => {
					
					if (err) return console.log(err);
					if (loading) return <ActivityIndicator size="large"/>
					setIsLoading(loading);

					setAllVaccinations(data.getVaccinations);

					let names = data.getVaccinations.filter(
						(vaccination, index, self) => {
							return (
								index ===
								self.findIndex(s => {
									return s.name === vaccination.name;
								})
							);
						}
					);

					names = names.map(item => {
						return {
							key: item.id,
							value: item.name,
							label: item.name
						};
					});

					return (
						<View style={{width:"80%"}}>
							<RNPickerSelect
								placeholder={{
									label: "Välj en vaccination...",
									value: null
								}}
								style={pickerSelectStyles}
								onValueChange={value => setName(value)}
								value={name ? name : null}
								items={names}
								Icon={() => {
									return <Chevron size={1.5} color="gray" />;
								}}
							/>
							<RNPickerSelect
								placeholder={{
									label: "Välj dos...",
									value: null
								}}
								style={pickerSelectStyles}
								onValueChange={value => setId(value)}
								value={id ? id : null}
								items={doses}
								Icon={() => {
									return (
										<Chevron size={1.5} color="gray" />
									);
								}}
							/>
							<RNPickerSelect
								placeholder={{
									label: "Antal veckor...",
									value: null
								}}
								style={pickerSelectStyles}
								onValueChange={value => {
									setWeek(value);
								}}
								value={week ? week : null}
								items={weeks}
								Icon={() => {
									return <Chevron size={1.5} color="gray" />;
								}}
							/>
							<RNPickerSelect
								placeholder={{
									label: "Antal månader...",
									value: null
								}}
								style={pickerSelectStyles}
								onValueChange={value => {
									setMonth(value);
								}}
								value={month ? month : null}
								items={months}
								Icon={() => {
									return <Chevron size={1.5} color="gray" />;
								}}
							/>
							<RNPickerSelect
								placeholder={{
									label: "Antal år...",
									value: null
								}}
								style={pickerSelectStyles}
								onValueChange={value => {
									setYear(value);
								}}
								value={year ? year : null}
								items={years}
								Icon={() => {
									return <Chevron size={1.5} color="gray" />;
								}}
							/>
							<TouchableOpacity
								onPress={() => setIsDateTimePickerVisible(true)}
								style={{ position: "relative" }}
							>
								<TextInput
									value={date.toString()}
									pointerEvents="none"
									style={pickerSelectStyles.inputIOS}
								/>
								<Chevron size={1.5} color="gray" style={styles.icon} />
							</TouchableOpacity>
							<DateTimePicker
								titleIOS="Välj datum"
								date={new Date(date)}
								isVisible={isDateTimePickerVisible}
								onConfirm={(data) => {
									let translatedDate = translateDate(data);
									setDate(translatedDate);
									setIsDateTimePickerVisible(false);
								}}
								onCancel={() => setIsDateTimePickerVisible(false)}
								isDarkModeEnabled={isDarkModeEnabled}
							/>
						</View>
					);
				}}
			</Query>
			<Mutation
				mutation={ADD_USER_VACCINATION}
				variables={{ vaccinationId: id, takenAt: setCorrectHours(new Date(date)) }}
				onError={({ graphQLErrors }) => {
					Alert.alert(
						"Failed to add vaccination",
						graphQLErrors[0].message,
						{ text: "OK" },
						{ cancelable: false }
					);
				}}
			>
				{(mutation, { loading, err, data }) => {
					if (isLoading) return null;
					else if (loading) return null;
					
					else {
						return (
							<TouchableOpacity style={styles.addButton} onPress={() => {
								mutation();
								props.navigation.navigate("VaccinationList");
							}}>
							<Text style={styles.addButtonText}>Lägg till ny vaccination</Text>
						</TouchableOpacity>
					);
				}}}
			</Mutation>
		</View>
	);
};

NewVaccination.navigationOptions = {
	title: "Ny vaccination",
	...navStyles
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "space-around",
		width: "100%"
	},
	icon: {
		position: "absolute",
		top: 24,
		right: 12,
	},
	addButton: {
		// flexGrow: 1,
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
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	}
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
		color: "black",
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
		color: "black",
		paddingRight: 30, // to ensure the text is never behind the icon
		width: "100%",
		height: 40
	},
	iconContainer: {
		top: 24,
		right: 12
	},
});

export default NewVaccination;
