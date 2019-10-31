import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_VACCINATIONS_QUERY = gql`
	query getVaccinationsQuery {
		getVaccinations {
			id
			name
			dose
		}
	}
`; 

const NewVaccination = () => {

	const [value, setValue] = useState();

	return (
		<View style={styles.container}>
		<Query query={GET_VACCINATIONS_QUERY}>
			{({ loading, err, data }) => {
				if (err) return console.log(err);
				if (loading) return <ActivityIndicator/>

				console.log(data.getVaccinations);
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
					<View style={styles.container}>
						<RNPickerSelect
							placeholder={{
								label: "Välj en vaccination...",
								value: null
							}}
							onValueChange={value => setValue(value)}
							value={value ? value : null}
							items={vaccinations}
						/>
					</View>
				)
			}} 
		</Query>
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
