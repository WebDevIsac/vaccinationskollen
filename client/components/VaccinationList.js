import React from 'react';
import { View, Text } from 'react-native';
import navStyles from "../styles/navStyles";

const VaccinationList = (props) => {
	console.log(props);
	return (
		<View>
			<Text>Hello</Text>
		</View>
	)
}

VaccinationList.navigationOptions = {
	title: "Dina Vaccinationer",
	...navStyles
}

export default VaccinationList;
