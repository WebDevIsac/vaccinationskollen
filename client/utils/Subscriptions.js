import gql from "graphql-tag";

export const NEW_VACCINATION_SUBSCRIPTION = gql`
subscription {
	newVaccination {
		id
	}
}
`;