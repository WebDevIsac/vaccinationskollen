import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Button, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Input } from "native-base";

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

	const [value, setValue] = useState();
	const [date, setDate] = useState("2019-10-29");

	return (
		<View style={styles.container}>
			<Query query={GET_VACCINATIONS_QUERY}>
			{({ loading, err, data }) => {
				if (err) return console.log(err);
				if (loading) return <ActivityIndicator/>

				let vaccinations = data.getVaccinations.map(vaccination => {
					let id = vaccination.id;
					let name = `${vaccination.name} ${vaccination.dose ? "Dos: " + vaccination.dose : ""}`;

					return {
						key: id,
						value: id,
						label: name
					}
				})

							return (
							<RNPickerSelect
								placeholder={{
									label: "Välj en vaccination...",
									value: null
								}}
								onValueChange={value => setValue(value)}
								value={value ? value : null}
								items={vaccinations}
							/>)
							}}
							</Query>
							<Mutation
							mutation={ADD_USER_VACCINATION}
							variables={{ vaccinationId: value, takenAt: date }}
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
		justifyContent: "center"
	}
});

export default NewVaccination;
