import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import useForm from '../lib/useForm';
import FormStyles from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        createUser( data: { email: $email, name: $name, password: $password }) {
            id
            name
            email
        }
    }
`;

export default function SignUp() {
    
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        name: '',
        password: ''
    });

    const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
        variables: inputs,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup().catch((err) => console.error(err));
        resetForm();
    }

    return (
        <FormStyles method='POST' onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <DisplayError error={error} />
            <fieldset>
                { data?.createUser && (
                    <p>{ data.createUser.email } Registered - Go ahead and Sign In</p>
                ) }
                <label htmlFor='email'>
                    Name
                    <input 
                        type='text' 
                        name='name' 
                        placeholder='Input name'
                        autoComplete='nmae'
                        value={inputs.name}
                        onChange={handleChange} 
                    />
                </label>
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