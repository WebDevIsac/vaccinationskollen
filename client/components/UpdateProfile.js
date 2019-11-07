import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { Mutation } from "react-apollo";
import { Form, Item, Input, Label } from "native-base"
import gql from "graphql-tag";
import navStyles from "../styles/navStyles";

const UPDATE_USER = gql`
	mutation getUserQuery {
		getUser {
			email
			name
		}
	}
`;

const UpdateProfile = (props) => {
	console.log(props.navigation.state);
	return (
		// <Mutation mutation={UPDATE_USER}>
			<Form>
				<Item floatingLabel>
					<Label>Namn</Label>
					<Input
						placeholder="Ditt namn..."
						onChange={() => console.log("hello")}
					/>
				</Item>
			</Form>
		// </Mutation>
	)
}

UpdateProfile.navigationOptions = {
	title: "Uppdatera Profil",
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

export default UpdateProfile;
