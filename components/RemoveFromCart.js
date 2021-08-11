import gql from 'graphql-tag';
import { useMutation } from "@apollo/client";
import styled from "styled-components";

const BigButton = styled.button`
    font-size: 3rem;
    background: none;
    border: 0;
    &:hover {
        color: var(--red);
        cursor: pointer;
    }
`;

const REMOVE_FROM_CART_MUTATION = gql`
    mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
        deleteCartItem(id: $id) {
            id
        }
    }
`;

const updateCache = (cache, payload) => {
    cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
    
    const [deleteCartItem, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
        variables: { id },
        update: updateCache 
    })

    const removeFromCartHandler = (id) => {
        deleteCartItem(id);
    }
    
    return (
        <BigButton 
            type='button' 
            title='Remove from cart'
            disabled={loading}
            onClick={() => removeFromCartHandler(id)}
        >
            &times;
        </BigButton>
    );
}