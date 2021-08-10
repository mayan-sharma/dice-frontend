import formatMoney from '../lib/formatMoney';
import styled from 'styled-components';

const CartItemStyles = styled.li`
    padding: 1rem 0;
    border-bottom: 1px solid var(--lightGray);
    display: grid;
    grid-template-columns: auto 1fr auto;
    img {
        width: 100px;
        margin-right: 1rem;
    }
    h3, p {
        margin: 0;
    }
`;

export default function CartItem({ cartItem }) {
    
    const { name, price, photo } = cartItem.product; 
    
    return (
        <CartItemStyles>
            <img src={photo.image.publicUrlTransformed} alt={name} /> 
            <div>
                <h3>{name}</h3>
                <p>{formatMoney(price * cartItem.quantity)} - <em> &times;{cartItem.quantity}</em></p>
            </div>
        </CartItemStyles>
    );
}