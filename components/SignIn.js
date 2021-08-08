import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import useForm from '../lib/useForm';
import FormStyles from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
            ... on UserAuthenticationWithPasswordSuccess {
                item {
                    id
                    name
                    email
                }
            }

            ... on UserAuthenticationWithPasswordFailure {
                code
                message
            }
        }
    }
`;

export default function SignIn() {
    
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: ''
    });

    const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        // to re-render the nav
        refetchQueries: [{ query: CURRENT_USER_QUERY }] 
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signin();
        resetForm();
    }

    const error = data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure' ? data.authenticateUserWithPassword : undefined;

    return (
        <FormStyles method='POST' onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <DisplayError error={error} />
            <fieldset>
                <label htmlFor='email'>
                    Email
                    <input 
                        type='email' 
                        name='email' 
                        placeholder='Input email address'
                        autoComplete='email'
                        value={inputs.email}
                        onChange={handleChange} 
                    />
                </label>
                <label htmlFor='password'>
                    Password
                    <input 
                        type='password' 
                        name='password' 
                        placeholder='Input password address'
                        autoComplete='password'
                        value={inputs.password}
                        onChange={handleChange} 
                    />
                </label>
                <button type='submit'>Sign In</button>
            </fieldset>
        </FormStyles>
    );
}