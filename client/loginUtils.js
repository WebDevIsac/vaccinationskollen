import { AsyncStorage } from "react-native";
import { AUTH_TOKEN } from "./constants";

let token;

export const getToken = async () => {
	token = await AsyncStorage.getItem(AUTH_TOKEN);
	return token;
};

export const signIn = async (newToken) => {
	return await AsyncStorage.setItem(AUTH_TOKEN, newToken);
};

export const signOut = async () => {
	token = undefined;
	await AsyncStorage.removeItem(AUTH_TOKEN);
};
