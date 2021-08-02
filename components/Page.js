import Header from './Header';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: viga;
        src: url('/public/static/Viga-Regular.ttf');
    }

    html {
        --red: blue;
        --black: #393939;
        --offWhite: #ededed;
        --bs: 0 12px 24px 0 #eaeaea;
        box-sizing: border-box;
        font-size: 10px;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    } 

    body {
        font-family: viga;
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 2;
    }

    a {
        text-decoration: none;
        color: var(--black);
    }

    a:hover {
        text-decoration: underline;
    }

    button {
        font-family: 'viga';
    }
`;

const InnerStyles = styled.div`
    margin: 0 auto;
    padding: 2rem;
`;

export default function Page({ children }) {
    return (
        <div>
            <GlobalStyles />
            <Header />
            <InnerStyles>
                {children}
            </InnerStyles>
        </div>
    )
}

Page.propTypes = {
    children: PropTypes.any,
};