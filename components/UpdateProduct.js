import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";

import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/Form';

const SINGLE_PRODUCT_QUERY = gql`
    query SINGLE_PRODUCT_QUERY($id: ID!) {
        Product(where: { id: $id }) {
            id,
            name,
            description,
            price
        }
    }
`;

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION(
        $id: ID!,
        $name: String,
        $description: String,
        $price: Int,
    ) {
        updateProduct(
            id: $id,
            data: {
                name: $name,
                description: $description,
                price: $price   
            }
        ) {
            id
            name
            description
            price
        }
    }
`;

export default function UpdateProduct({ id }) {
    
    const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, { variables: { id } });

    const [ updateProduct, { data: updateData, error: updateError, loading: updateLoading } ] = useMutation(UPDATE_PRODUCT_MUTATION);

    const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await updateProduct({
            variables: {
                id: id,
                name: inputs.name,
                description: inputs.description,
                price: inputs.price
            }
        }).catch(err => console.log(err));
    }

    if (loading) return <p>Loading...</p>;

    return (
        <FormStyles onSubmit={handleSubmit}>
            <DisplayError error={error || updateError} />
            <fieldset disabled={updateLoading} aria-busy={updateLoading}>
                <label htmlFor="name">
                    Name
                    <input 
                        type="text"
                        id="name"
                        name="name"
                        value={inputs.name}
                        placeholder="Name"
                        onChange={handleChange}
                        required 
                    />
                </label>
                <label htmlFor="price">
                    Price
                    <input 
                        type="number"
                        id="price"
                        name="price"
                        value={inputs.price}
                        placeholder="Price"
                        onChange={handleChange} 
                        required
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea 
                        id="description"
                        name="description"
                        value={inputs.description}
                        placeholder="Description"
                        onChange={handleChange}
                        required 
                    />
                </label>
                <button type="submit">Update Product</button>
            </fieldset>
        </FormStyles>
    );
}