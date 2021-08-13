import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import nProgress from 'nprogress';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import SickButton from './styles/SickButton';
import { useCart } from '../lib/cartState';
import { CURRENT_USER_QUERY } from './User';


const CheckoutFormStyles = styled.form`
    box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    padding: 1rem;
    display: grid;
    grid-gap: 1rem;
    font-size: 2rem;
`;

const CREATE_ORDER_MUTATION = gql`
    mutation CREATE_ORDER_MUTATION($token: String!) {
        checkout(token: $token) {
            id
            charge
            total
            items {
                id
                name
            }
        }
    }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutForm = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [checkout, { error: graphQLError }] = useMutation(CREATE_ORDER_MUTATION, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });

    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const { toggleCart } = useCart();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        nProgress.start();
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (error) {
            setError(error);
            nProgress.done();
            return;
        }

        const order = await checkout({
            variables: {
                token: paymentMethod.id
            }
        });

        router.push({
            pathname: '/order/[id]',
            query: { id: order.data.checkout.id }
        });

        toggleCart();

        setLoading(false);
        nProgress.done();
    }

    return (
        <CheckoutFormStyles onSubmit={handleSubmit}>
            { error && error.message }
            { graphQLError && graphQLError.message }
            <CardElement />
            <SickButton>
                Check out
            </SickButton>
        </CheckoutFormStyles>
    );
}

export default function Checkout() {
    return (
        <Elements stripe={stripeLib}>
            <CheckoutForm />
        </Elements>    
    );
}