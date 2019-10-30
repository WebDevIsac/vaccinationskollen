import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { Mutation } from "react-apollo";
import { Form, Item, Input, Label } from "native-base"
import gql from "graphql-tag";

const UPDATE_USER = gql`
	mutation getUserQuery {
		getUser {
			email
			name
		}
	}
`;

const UpdateProfile = () => {
	const [name, setName] =


	return (
		<Mutation mutation={UPDATE_USER}>
			<Form>
				<Item>
					<Label>Namn</Label>
					<Input
						placeholder="Isac"
						value={}
					/>
				</Item>
			</Form>
		</Mutation>
	)
}

UpdateProfile.navigationOptions = {
	title: "Uppdatera Profil",
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

export default UpdateProfile;
