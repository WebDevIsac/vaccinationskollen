import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { Form, Item, Input, Label } from "native-base"
import { Mutation } from "react-apollo";
import navStyles from "../styles/navStyles";
import gql from "graphql-tag";
import { Appearance } from "react-native-appearance";
import { Chevron } from "react-native-shapes";
import DateTimePicker from "react-native-modal-datetime-picker";

import { translateDate, setCorrectHours } from "../utils/dateUtils";

const ADD_CHILD_MUTATION = gql`
	mutation AddChildMutation($name: String!, $born: DateTime!) {
		addChild(name: $name, born: $born) {
			id
		}
	}
`;

const colorScheme = Appearance.getColorScheme();
const isDarkModeEnabled = colorScheme === 'dark';

const AddChild = () => {

	
	const [name, setName] = useState();
	const [bornDate, setBornDate] = useState(translateDate(new Date()));
	const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
	
	return (
		<Mutation
			mutation={ADD_CHILD_MUTATION}
			variables={{ name: name, born: setCorrectHours(new Date(bornDate)) }}
			onError={({ graphQLErrors }) => {
				Alert.alert(
					"Could not add child",
					graphQLErrors[0].message,
					{ text: "OK" },
					{ cancelable: false }
				);
			}}
		>
			{(mutation, { loading, err, data }) => {
				if (err) return console.log(err);
				if (loading) return <ActivityIndicator size="large"/>


				return (
					<View style={styles.container}>
						<View style={styles.inputContainer}>
							<Item floatingLabel>
								<Label>Namn</Label>
								<TextInput 
									onChange={setName}
									value={name}
								/>
							</Item>
							<Item style={{borderColor: "transparent", width: "100%"}} >
							<TouchableOpacity
								onPress={() => setIsDateTimePickerVisible(true)}
								style={{ position: "relative", width: "100%" }}
							>
								<TextInput
									value={bornDate.toString()}
									pointerEvents="none"
									style={pickerSelectStyles.inputIOS}
								/>
								<Chevron size={1.5} color="gray" style={styles.icon} />
							</TouchableOpacity>
							</Item>
							<DateTimePicker
								titleIOS="Välj födelsedatum"
								date={new Date(bornDate)}
								isVisible={isDateTimePickerVisible}
								onConfirm={(data) => {
									let translatedDate = translateDate(data);
									setBornDate(translatedDate);
									setIsDateTimePickerVisible(false);
								}}
								onCancel={() => setIsDateTimePickerVisible(false)}
								isDarkModeEnabled={isDarkModeEnabled}
							/>
						</View>
					</View>
				)
			}}
		</Mutation>
	);
};

AddChild.navigationOptions = {
	title: "Lägg till barn",
	...navStyles
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "space-around",
		width: "100%"
	},
	icon: {
		position: "absolute",
		top: 24,
		right: 12,
	},
	inputContainer: {
		width: "80%"
	}
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 8,
		paddingHorizontal: 8,
		marginVertical: 8,
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 4,
		color: "black",
		paddingRight: 30, // to ensure the text is never behind the icon
		width: "100%",
		height: 40
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: "purple",
		borderRadius: 8,
		color: "black",
		paddingRight: 30, // to ensure the text is never behind the icon
		width: "100%",
		height: 40
	},
	iconContainer: {
		top: 24,
		right: 12
	},
});

export default AddChild;
