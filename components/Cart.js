import { useUser } from './User';
import CartItem from './CartItem';
import formatMoney from '../lib/formatMoney';
import { useCart } from '../lib/cartState';
import CartStyles from './styles/CartStyles';
import CloseButtonStyles from './styles/CloseButton';

export default function Cart() {

    const user = useUser();
    const { cartOpen, toggleCart } = useCart();

    const totalPrice = cart => cart.reduce((total, cartItem) => total + (cartItem.product.price * cartItem.quantity), 0);

    if (!user) return null;

    return (
        <CartStyles open={cartOpen}>
            <header>
                CART
            </header>
                <CloseButtonStyles onClick={toggleCart}>&times;</CloseButtonStyles>
            <ul>
                { user.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />) }
            </ul>          
            <footer>
                <p>{formatMoney(totalPrice(user.cart))}</p>
            </footer> 
        </CartStyles>        
    );
}