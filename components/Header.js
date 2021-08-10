import Link from 'next/link';
import styled from 'styled-components';

import Nav from './Nav';
import Cart from './Cart';

const LogoStyle = styled.h1`
    font-size: 3rem;
    margin-left: 2rem;
    position: relative;
    z-index: 2;
    a {
        color: #000;
        text-decoration: none;
    }
`;

const HeaderStyle = styled.header`
    .bar {
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;
        border-bottom: 5px solid var(--black, #000);
    }

    .sub-bar {
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 2px solid var(--black, #000);
    }
`;

export default function Header() {
    return (
        <HeaderStyle>
            <div className="bar">
                <LogoStyle>
                    <Link href="/">dice</Link>
                </LogoStyle>
                <Nav />
            </div>  
            <div className="sub-bar">
                <p>Search</p>
            </div>
            <Cart />
        </HeaderStyle>
    );
}
