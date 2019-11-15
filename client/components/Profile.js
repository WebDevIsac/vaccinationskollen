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
		<Query query={GET_USER_QUERY}>
			{({ loading, err, data }) => {
				if (err) return console.log(err);
				if (loading) return <LoadingIndicator />

				return (
					<View style={styles.container}>
						<Text>Name: {data.getUser.name}</Text>
						<Text>Email: {data.getUser.email}</Text>
						<Button
							title="Uppdatera profil"
							onPress={() => props.navigation.navigate("UpdateProfile", { user: data.getUser })}
						/>
						<Button
							title="Dina vaccinationer"
							onPress={() => props.navigation.navigate("VaccinationList")}
						/>
						<Button 
							title="Lägg till barn"
							onPress={() => props.navigation.navigate("AddChild")}
						/>
						{/* <Button 
							title="Karls Vaccinationer"
						/> 
						<Button 
							title="Lisas vaccinationer"
						/>  */}
					</View>
				)
			}}
		</Query>
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
