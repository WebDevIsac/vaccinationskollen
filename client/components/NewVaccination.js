import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Button, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Chevron } from "react-native-shapes";

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

const NewVaccination = () => {
	const [id, setId] = useState();
	const [date, setDate] = useState("2019-10-29");
	const [doses, setDoses] = useState();
	const [name, setName] = useState();
	const [allVaccinations, setAllVaccinations] = useState();

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
				}
			});
			setDoses(updateDoses);
		}
	}, [name]);

	return (
		<View style={styles.container}>
			<Query query={GET_VACCINATIONS_QUERY}>
				{({ loading, err, data }) => {
					if (err) return console.log(err);
					if (loading) return <ActivityIndicator/>

					setAllVaccinations(data.getVaccinations);

					let names = data.getVaccinations.filter((vaccination, index, self) => {
						return index === self.findIndex((s) => {
							return s.name === vaccination.name
						});
					});

					names = names.map(item => {
						return {
							key: item.id,
							value: item.name,
							label: item.name
						}
					});

					return (
						<View>
							<RNPickerSelect
								placeholder={{
									label: "Välj en vaccination...",
									value: null
								}}
								style={{...pickerSelectStyles, iconContainer: { top: 10, right: 12 }}}
								onValueChange={value => setName(value)}
								value={name ? name : null}
								items={names}
								Icon={() => {
									return <Chevron size={1.5} color="gray" />
								}}
							/>
							{doses && (
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
									return <Chevron size={1.5} color="gray" />
								}}
								/>
							)}
						</View>
					)
				}}
			</Query>
			<Mutation
				mutation={ADD_USER_VACCINATION}
				variables={{ vaccinationId: id, takenAt: date }}
				onError={({ graphQLErrors }) => {
					Alert.alert(
						'Failed to add vaccination',
						graphQLErrors[0].message,
						{text: 'OK'},
						{cancelable: false},
					);
				}}
			>
				{( mutation, { loading, err, data }) => {
					return (
					<Button
					title="Lägg till vaccination"
					onPress={() => mutation()}
					/>
					)
				}}
			</Mutation>
		</View>
	);
};

NewVaccination.navigationOptions = {
	title: "Ny vaccination",
	headerStyle: {
		backgroundColor: "#373142",
		borderBottomWidth: 0
	},
	headerTitleStyle: {
		color: "#FFF"
	},
	headerTintColor: "#82D8D8"
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "center",
	}
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
	  fontSize: 16,
	  paddingVertical: 12,
	  paddingHorizontal: 10,
	  borderWidth: 1,
	  borderColor: 'gray',
	  borderRadius: 4,
	  color: 'black',
	  paddingRight: 30, // to ensure the text is never behind the icon
	  width: 200,
	  height: 40
	},
	inputAndroid: {
	  fontSize: 16,
	  paddingHorizontal: 10,
	  paddingVertical: 8,
	  borderWidth: 0.5,
	  borderColor: 'purple',
	  borderRadius: 8,
	  color: 'black',
	  paddingRight: 30, // to ensure the text is never behind the icon
	  width: 200,
	  height: 40
	},
  });

export default NewVaccination;
