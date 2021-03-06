import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
mutation LoginMutation($email: String!, $password: String!) {
	login(email: $email, password: $password) {
			token
		}
	}
`;

export const SIGNUP_MUTATION = gql`
	mutation SignupMutation($name: String!, $email: String!, $password: String!, $born: DateTime!) {
		signup(name: $name, email: $email, password: $password, born: $born) {
			token
		}
	}
`;

export const DELETE_USER_VACCINATION_MUTATION = gql`
	mutation DeleteUserVaccinationMutation($id: ID!) {
		deleteUserVaccination(id: $id) {
			id
		}
	}
`;

export const ADD_USER_VACCINATION = gql`
	mutation AddUserVaccination($childId: ID, $vaccinationId: ID!, $takenAt: String, $nextDose: String, $protectUntil: String) {
		addUserVaccination(childId: $childId, vaccinationId: $vaccinationId, takenAt: $takenAt, nextDose: $nextDose, protectUntil: $protectUntil) {
			id
			user {
				name
			}
			child {
				name
			}
			type {
				name
				dose
			}
			takenAt
			createdAt
			nextDose
			protectUntil
		}
	}
`;

export const ADD_CHILD_MUTATION = gql`
	mutation AddChildMutation($name: String!, $born: DateTime!) {
		addChild(name: $name, born: $born) {
			id
		}
	}
`;