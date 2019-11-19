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
	TouchableOpacity,
	Label
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Query, Mutation } from "react-apollo";
import { Chevron } from "react-native-shapes";
import navStyles from "../styles/navStyles";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Appearance } from "react-native-appearance";
import { translateDate, setCorrectHours, setDateFromTime } from "../utils/dateUtils";
import { GET_CHILDREN_AND_VACCINATIONS_QUERY, GET_FAMILY_VACCINATIONS_QUERY, TEST_QUERY_ALL_VACCINATIONS } from "../utils/Queries";
import { ADD_USER_VACCINATION } from "../utils/Mutations";

const colorScheme = Appearance.getColorScheme();
const isDarkModeEnabled = colorScheme === "dark";

const NewVaccination = props => {
	const [id, setId] = useState();
	const [date, setDate] = useState(translateDate(new Date()));
	const [doses, setDoses] = useState([{ value: "1", label: "Dos 1" }]);
	const [name, setName] = useState();
	const [allVaccinations, setAllVaccinations] = useState();
	const [nextDose, setNextDose] = useState();
	const [nextDoseDate, setNextDoseDate] = useState();
	const [untilNext, setUntilNext] = useState();
	const [protectUntil, setProtectUntil] = useState();
	const [protectUntilDate, setProtectUntilDate] = useState();
	const [protectDuration, setProtectDuration] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
	const [taker, setTaker] = useState();
	
	let inputRefs = {
		taker: undefined,
		vaccination: undefined,
		dose: undefined,
		nextDose: undefined,
		protectUntil: undefined,
		date: undefined
	}

	let time = [];
	for (let i = 0; i < 4; i++) {
		let string = i < 0 ? " vecka" : " veckor";
		time.push({
			label: (i + 1).toString() + string,
			value: (i + 1).toString() + string
		});
	}
	for (let i = 0; i < 11; i++) {
		let string = i < 0 ? " månad" : " månader";
		time.push({
			label: (i + 1).toString() + string,
			value: (i + 1).toString() + string
		});
	}
	for (let i = 0; i < 50; i++) {
		let string = " år";
		time.push({
			label: (i + 1).toString() + string,
			value: (i + 1).toString() + string
		});
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

	useEffect(() => {
		if (id) {
			setUntilNext(allVaccinations.find(item => item.id === id).untilNext);
			setProtectDuration(allVaccinations.find(item => item.id === id).protectDuration)
		}
	}, [id])

	return (
		<View style={styles.container}>
			<Query query={GET_CHILDREN_AND_VACCINATIONS_QUERY}>
				{({ loading, err, data }) => {
					if (err) return console.log(err);
					if (loading) return <ActivityIndicator size="large" />;
					setIsLoading(loading);

					setAllVaccinations(data.getVaccinations);
					
					let userNames = [{value: "null", label: "Jag"}];

					data.getChild.map(child => {
						child = {
							value: child.id,
							label: child.name
						}
						userNames.push(child);
					});

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
						<View style={{ width: "80%" }}>
							<RNPickerSelect
								placeholder={{
									label: "Vem har tagit vaccinationen...",
									value: null
								}}
								style={pickerSelectStyles}
								onValueChange={value => setTaker(value)}
								value={taker ? taker : null}
								items={userNames}
								Icon={() => {
									return <Chevron size={1.5} color="gray" />;
								}}
								doneText="Klar"
								ref={el => inputRefs.taker = el}
								onDownArrow={() => {
									inputRefs.vaccination.togglePicker();
								}}
							/>
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
								doneText="Klar"
								ref={el => inputRefs.vaccination = el}
								onUpArrow={() => {
									inputRefs.taker.togglePicker();
								}}
								onDownArrow={() => {
									inputRefs.dose.togglePicker();
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
									return <Chevron size={1.5} color="gray" />;
								}}
								doneText="Klar"
								ref={el => inputRefs.dose = el}
								onUpArrow={() => {
									inputRefs.vaccination.togglePicker();
								}}
								onDownArrow={() => {
									inputRefs.nextDose.togglePicker();
								}}
							/>
							<RNPickerSelect
								placeholder={{
									label: "Nästa dos ska tas...",
									value: null
								}}
								style={pickerSelectStyles}
								onValueChange={value => {
									setNextDose(value);
									setNextDoseDate(setDateFromTime(value, setCorrectHours(new Date(date))));
								}}
								value={nextDose ? nextDose : null}
								items={time}
								Icon={() => {
									return <Chevron size={1.5} color="gray" />;
								}}
								doneText="Klar"
								ref={el => inputRefs.nextDose = el}
								onUpArrow={() => {
									inputRefs.dose.togglePicker();
								}}
								onDownArrow={() => {
									inputRefs.protectUntil.togglePicker();
								}}
							/>
							<Text style={!untilNext && {display: "none"}}>{untilNext && `Nästa dos rekommenderas tas om ${untilNext}`}</Text>
							<RNPickerSelect
								placeholder={{
									label: "Vaccination skyddar i...",
									value: null
								}}
								style={pickerSelectStyles}
								onValueChange={value => {
									setProtectUntil(value);
									setProtectUntilDate(setDateFromTime(value, setCorrectHours(new Date(date))));
								}}
								value={protectUntil ? protectUntil : null}
								items={time}
								Icon={() => {
									return <Chevron size={1.5} color="gray" />;
								}}
								doneText="Klar"
								ref={el => inputRefs.protectUntil = el}
								onUpArrow={() => {
									inputRefs.nextDose.togglePicker();
								}}
								onDownArrow={() => {
									setIsDateTimePickerVisible(true);
								}}
								/>
							<Text style={!protectDuration && {display: "none"}}>{protectDuration && `Enligt våra uppgifter skyddar vaccination dig i ${protectDuration}`}</Text>
							<Text style={{ marginTop: 24 }}>När togs vaccinationen?</Text>
							<TouchableOpacity
								onPress={() => setIsDateTimePickerVisible(true)}
								style={{ position: "relative" }}
							>
								<TextInput
									value={date.toString()}
									pointerEvents="none"
									style={pickerSelectStyles.inputIOS}
								/>
								<Chevron
									size={1.5}
									color="gray"
									style={styles.icon}
								/>
							</TouchableOpacity>
							<DateTimePicker
								titleIOS="Välj datum"
								cancelTextIOS="Avbryt"
								confirmTextIOS="Klar"
								date={new Date(date)}
								isVisible={isDateTimePickerVisible}
								onConfirm={data => {
									let translatedDate = translateDate(data);
									setDate(translatedDate);
									setIsDateTimePickerVisible(false);
								}}
								onCancel={() =>
									setIsDateTimePickerVisible(false)
								}
								isDarkModeEnabled={isDarkModeEnabled}
							/>
						</View>
					);
				}}
			</Query>
			<Mutation
				mutation={ADD_USER_VACCINATION}
				variables={{
					childId: taker,
					vaccinationId: id,
					takenAt: setCorrectHours(new Date(date)),
					nextDose: nextDoseDate,
					protectUntil: protectUntilDate
				}}
				onCompleted={() => {
					setTaker(null);
					setName(null);
					setId(null);
					setNextDose(null)
					setNextDoseDate(null)
					setProtectUntil(null)
					setProtectUntilDate(null)
					setDate(translateDate(new Date()))
					setUntilNext(null);
					setProtectDuration(null);
					props.navigation.navigate("VaccinationList", {refetch: true});
				}}
				onError={({ networkError, graphQLErrors }) => {
					graphQLErrors.map(err => {
						console.log("gql error: " + err.message);
					})
					console.log("network error: " + networkError);
				}}
				refetchQueries={[{query: TEST_QUERY_ALL_VACCINATIONS}, {query: GET_FAMILY_VACCINATIONS_QUERY}]}
			>
				{(mutation, { loading, err, data }) => {
					if (isLoading) return null;
					else if (loading) return null;
					else if (err) {console.log(err); return null;}
					else {
						return (
							<TouchableOpacity
								style={styles.addButton}
								onPress={() => {
									mutation();
								}}
							>
								<Text style={styles.addButtonText}>
									Lägg till ny vaccination
								</Text>
							</TouchableOpacity>
						);
					}
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
		width: "100%"
	},
	icon: {
		position: "absolute",
		top: 24,
		right: 12
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
		fontSize: 18
	},
	loading: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center"
	}
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 8,
		paddingHorizontal: 8,
		marginVertical: 8,
		borderBottomWidth: 1,
		borderColor: "lightgray",
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
		borderColor: "lightgray",
		borderRadius: 8,
		color: "black",
		paddingRight: 30, // to ensure the text is never behind the icon
		width: "100%",
		height: 40
	},
	iconContainer: {
		top: 24,
		right: 12
	}
});

export default NewVaccination;
