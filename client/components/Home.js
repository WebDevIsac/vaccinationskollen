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
				if (loading) return <View style={styles.loading}><ActivityIndicator size="large" /></View>

				let welcomeMessage = `Välkommen${firstTime ? "" : " tillbaka"} ${data.getUser.name}`;

				return (
					<View style={styles.container}>
						<Text>{welcomeMessage}</Text>
						<Text>Dina senast tagna vaccinationer</Text>
						<Text>Dessa vaccinationer rekommenderas fyllas på snart igen</Text>
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
		justifyContent: "center",
	},
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default Home;