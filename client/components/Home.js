import React from "react";
import { Text, StyleSheet, View, Button, ActivityIndicator } from "react-native";
import navStyles from "../styles/navStyles";
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

const Home = (props) => {
	const { firstTime } = props.screenProps;
	return (
		<Query query={GET_USER_QUERY}>
			{({ loading, err, data }) => {
				if (err) return console.log(err);
				if (loading) return <ActivityIndicator size="large" />

				let welcomeMessage = `Välkommen${firstTime ? "" : " tillbaka"} ${data.getUser.name}`;

				return (
					<View style={styles.container}>
						<Text>{welcomeMessage}</Text>
						<Button
							title="Gå till din profil"
							onPress={() => props.navigation.navigate("Profile")}
						/>
					</View>
				)
			}}
		</Query>
	)
}

Home.navigationOptions = {
	title: "Hem",
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

export default Home;