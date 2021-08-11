import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
    mutation ADD_TO_CART_MUTATION($id: ID!) {
        addToCart(productId: $id) {
            id,
        }
    }
`;

export default function AddToCart({ id }) {

    const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
        variables: { id },
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });

    const addToCartHandler = id => {
        addToCart(id);
    }

    return (
        <button 
            type="button" 
            onClick={() => addToCartHandler(id)}
            disabled={loading}
        >
            {loading ? 'Adding to Cart' : 'Add to Cart'}
        </button>

    ); 
}