import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
    query {
        # authneticatedItem may return multiple data types
        authenticatedItem {
            ... on User {
                id
                name
                email
            }
        }
    }
`;

export function useUser() {
    const { data } = useQuery(CURRENT_USER_QUERY);
    return data?.authenticatedItem;
}