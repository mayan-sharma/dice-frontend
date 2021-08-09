import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import useForm from '../lib/useForm';
import FormStyles from './styles/Form';
import DisplayError from './ErrorMessage';

const REQUEST_PASSWORD_RESET_MUTATION = gql`
    mutation REQUEST_PASSWORD_RESET_MUTATION($email: String!) {
        sendUserPasswordResetLink(email: $email) {
            code
            message
        }
    }
`; 

export default function RequestReset() {
    
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
    });

    const [requestReset, { data, loading, error }] = useMutation(REQUEST_PASSWORD_RESET_MUTATION, {
        variables: inputs, 
    });

    console.log(data);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await requestReset().catch(err => console.error(err));
        resetForm();
    }

    return (
        <FormStyles method='POST' onSubmit={handleSubmit}>
            <h2>Request Reset Password</h2>
            <DisplayError error={error} />
            <fieldset>
                { data?.sendUserPasswordResetLink === null && (
                    <p>Password Reset Link sent to mail</p>
                )}
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
                <button type='submit'>Reset Password</button>
            </fieldset>
        </FormStyles>
    );
}