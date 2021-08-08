import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { CURRENT_USER_QUERY } from "./User";

const SIGNOUT_MUTATION = gql`
    mutation {
        endSession
    }
`;

export default function SignOut() {
    
    const [signout] = useMutation(SIGNOUT_MUTATION, {
        // to re-render nav
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
    })

    const handleSignOut = () => {
        signout();
    }
    
    return (
        <button type='button' onClick={handleSignOut}>Sign Out</button>    
    );
}