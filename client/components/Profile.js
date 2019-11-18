import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import navStyles from "../styles/navStyles";
import LoadingIndicator from './LoadingIndicator';

const GET_USER_QUERY = gql`
	query getUserQuery {
		getUser {
			email
			name
		}
	}
`;

const Profile = (props) => {
	return (
		// <Query query={GET_USER_QUERY}>
		// 	{({ loading, err, data }) => {
		// 		if (err) return console.log(err);
		// 		if (loading) return <LoadingIndicator />

		// 		console.log(data);

		// 		return (
					<View style={styles.container}>
						<Button
							title="Dina vaccinationer"
							onPress={() => props.navigation.navigate("VaccinationList")}
						/>
						<Button 
							title="Lägg till barn"
							onPress={() => props.navigation.navigate("AddChild")}
						/>
					</View>
		// 		)
		// 	}}
		// </Query>
	)
}

Profile.navigationOptions = {
	title: "Din Profil",
	...navStyles
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "center"
	}
});

export default Profile;
