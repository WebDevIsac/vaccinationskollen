import gql from "graphql-tag";

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