import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import useForm from '../lib/useForm';
import FormStyles from './styles/Form';
import DisplayError from './ErrorMessage';

const PASSWORD_RESET_MUTATION = gql`
    mutation PASSWORD_RESET_MUTATION($email: String!, $token: String!, $password: String!) {
        redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
            code
            message
        }
    }
`; 

export default function Reset({ token }) {
    
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
        token
    });

    const [resetPassword, { data, loading, error }] = useMutation(PASSWORD_RESET_MUTATION, {
        variables: inputs, 
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await resetPassword().catch((err) => console.error(err));
        resetForm();
    }

    // cause some errors returns successful code and no error
    const successfullError = data?.redeemUserPasswordResetToken?.code ? data.redeemUserPasswordResetToken : undefined;

    return (
        <FormStyles method='POST' onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            <DisplayError error={error || successfullError} />
            <fieldset>
                { data?.redeemUserPasswordResetToken === null && (
                    <p>Password has been reset.</p>
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
                <label htmlFor='password'>
                    New Password
                    <input 
                        type='password' 
                        name='password' 
                        placeholder='Input new password'
                        autoComplete='password'
                        value={inputs.password}
                        onChange={handleChange} 
                    />
                </label>
                <button type='submit'>Reset Password</button>
            </fieldset>
        </FormStyles>
    );
}