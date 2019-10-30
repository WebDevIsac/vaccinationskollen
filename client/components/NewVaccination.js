import React, { useState } from "react";
import { View, Text } from "react-native";
import { Picker } from "native-base";

const NewVaccination = () => {
	return (
		<View style={styles.container}>
			<Picker
				headerComponent={
					<Header>
						<Button transparent>Custom Back</Button>
						<Title>Custom Header</Title>
					</Header>
				}
				mode="dropdown"
				selectedValue={this.state.selected1}
				onValueChange={this.onValueChange.bind(this)}
			>
				<Item label="Cats" value="key0" />
				<Item label="Dogs" value="key1" />
				<Item label="Birds" value="key2" />
				<Item label="Elephants" value="key3" />
			</Picker>
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
