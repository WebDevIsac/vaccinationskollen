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
	const [date, setDate] = useState(new Date());
	const [doses, setDoses] = useState([{value: "1", label: "Dos 1"}]);
	const [name, setName] = useState();
	const [allVaccinations, setAllVaccinations] = useState();
	const [week, setWeek] = useState();
	const [month, setMonth] = useState();
	const [year, setYear] = useState();
	const [isLoading, setIsLoading] = useState();
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

	console.log(date);

	return (
		<View style={styles.container}>
			<Button
				title="Gå till din profil"
				onPress={() => props.navigation.navigate("Profile")}
			/>
			<Query query={GET_VACCINATIONS_QUERY}>
				{({ loading, err, data }) => {
					setIsLoading(loading);
					if (err) return console.log(err);
					if (loading) return <ActivityIndicator/>

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
						<View>
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
									placeholder="Datum..."
									pointerEvents="none"
									style={pickerSelectStyles.inputIOS}
								/>
								<Chevron size={1.5} color="gray" style={styles.icon} />
							</TouchableOpacity>
							<DateTimePicker 
								isVisible={isDateTimePickerVisible}
								onConfirm={(data) => setDate(data)}
								onCancel={() => setIsDateTimePickerVisible(false)}
								isDarkModeEnabled={isDarkModeEnabled}
							/>
						</View>
					);
				}}
			</Query>
			<Mutation
				mutation={ADD_USER_VACCINATION}
				variables={{ vaccinationId: id, takenAt: date }}
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
					if (loading) setIsLoading(loading);

					setIsLoading(loading);

					return (
						<Button
							title="Lägg till vaccination"
							onPress={() => {
								mutation();
								props.navigation.goBack();
							}}
						/>
					);
				}}
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
	},
	icon: {
		position: "absolute",
		top: 24,
		right: 12,
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
		width: 200,
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
		width: 200,
		height: 40
	},
	iconContainer: {
		top: 24,
		right: 12
	}
});

export default NewVaccination;
