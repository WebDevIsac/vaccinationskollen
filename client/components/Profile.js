import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_USER_QUERY = gql`
	query getUserQuery {
		getUser {
			email
			name
		}
	}
`;

const Profile = () => {
	return (
		<Query query={GET_USER_QUERY}>
			{({ loading, err, data }) => {
				if (err) return console.log(err);
				if (loading) return <ActivityIndicator/>

				return (
					<View style={styles.container}>
						<Text>Name: {data.getUser.name}</Text>
						<Text>Email: {data.getUser.email}</Text>
						<Button
							title="Uppdatera profil"
							onPress={() => console.log("Ändra")}
						/>
						<Text>Dina vaccinationer</Text>
					</View>
				)
			}}
		</Query>
	)
}

Profile.navigationOptions = {
	title: "Din Profil",
	headerStyle: {
		backgroundColor: "#373142",
		borderBottomWidth: 0,
	},
	headerTitleStyle: {
		color: "#000"
	},
	headerBackTitle: {
		color: "#82D8D8"
	},
	headerTintColor: "#82D8D8"
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
