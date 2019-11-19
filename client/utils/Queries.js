import gql from "graphql-tag";

export const GET_FAMILY_VACCINATIONS_QUERY = gql`
	query GetFamilyVaccinationsQuery {
		getFamilyVaccinations {
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
		getUser {
			id
			name
		}
	}
`;

export const GET_VACCINATIONS_AND_CHILD_QUERY = gql`
	query getVaccinationsAndChildQuery($childId: String) {
		getUserVaccinations(childId: $childId) {
			id
			takenAt
			createdAt
			nextDose
			protectUntil
			type {
				name
				dose
			}
			child {
				id
				name
			}
		}
		getChild {
			id
			name
		}
	}
`;

export const GET_CHILDREN_AND_VACCINATIONS_QUERY = gql`
query GetChildrenAndVaccinationsQuery {
	getVaccinations {
		id
		name
		dose
		untilNext
		protectDuration
	}
	getChild {
		id
		name
	}
}
`;