import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const LoadingIndicator = () => {
	return (
		<View style={styles.loading}>
			<ActivityIndicator size="large" />
		</View>
	);
};

const styles = StyleSheet.create({
	loading: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		height: "100%",
		width: "100%",
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "center"
	}
});

export default LoadingIndicator;
