import Link from 'next/link';

import SignOut from './SignOut';
import CartCount from './CartCount';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import { useCart } from '../lib/cartState';

export default function Nav() {
    
    const user = useUser();
    const { toggleCart } = useCart();

    const getTotalCartItems = cart => cart.reduce((total, cartItem) => total + cartItem.quantity, 0);

    return (
        <NavStyles>
            <Link href="/products">Products</Link>
            {user && (
                <>
                    <Link href="/sell">Sell</Link>
                    <Link href="/orders">Orders</Link>
                    <Link href="/account">Account</Link>
                    <SignOut />
                    <button type="button" onClick={toggleCart}>
                        Cart <CartCount count={getTotalCartItems(user.cart)} />
                    </button>
                </>
            )}

            {!user && (
                <>
                    <Link href="/signin">Sign In</Link>
                </>
            )}
        </NavStyles>
    );
}
