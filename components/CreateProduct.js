import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';

import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import FormStyles from './styles/Form';

const CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION(
        $name: String!
        $description: String!
        $price: Int!
        $image: Upload
    ) {
        createProduct(
            data: {
                name: $name,
                description: $description,
                price: $price,
                status: "AVAILABLE"
                photo: {
                    create: {
                        image: $image,
                        altText: $name
                    }
                }
            }
        ) {
            id
        }
    }
`;

export default function CreateProduct() {
    
    const { inputs, handleChange, clearForm, resetForm } = useForm({
        image: '',
        name: 'testData',
        price: 420,
        description: 'testDescription'
    });

    const [ createProduct, { loading, error, data } ] = useMutation(
        CREATE_PRODUCT_MUTATION,
        {
            variables: inputs,
            refetchQueries: [{ query: ALL_PRODUCTS_QUERY }]
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createProduct();
        clearForm();
        Router.push({
            pathname: `/product/${res.data.createProduct.id}`
        });
    }

    return (
        <FormStyles onSubmit={handleSubmit}>
            <DisplayError error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="image">
                    Image
                    <input 
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                        required 
                    />
                </label>
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
                <button type="submit">+ Add product</button>
            </fieldset>
        </FormStyles>
    );
};  