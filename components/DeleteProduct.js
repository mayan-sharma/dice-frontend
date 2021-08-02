import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id: ID!) {
        deleteProduct(id: $id) {
            id
            name
        }
    }
`;

const update = (cache, payload) => {
    console.log("Product Deleted!");
    cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
    
    const [ deleteProduct, { loading } ] = useMutation(
        DELETE_PRODUCT_MUTATION,
        { 
            variables: { id },
            update: update 
        }
    );

    const deleteHandler = () => {
        if(confirm("Are you sure you want to delete this product?")) {
            deleteProduct().catch(err => alert("Error while deleting!"));
        }
    }
    
    return (
        <button disabled={loading} onClick={deleteHandler}>
            {children}
        </button>
    );
}