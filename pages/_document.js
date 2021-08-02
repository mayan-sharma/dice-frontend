import Document, { Html, Head, NextScript, Main } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    
    // renders page with css (otherwise a loads the html then waits for the css thus gets a 
    // flicker or wont load css till page is refreshed
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
        const styleTags = sheet.getStyleElement();

        return { ...page, styleTags };
    }
    
    render() {
        return (
            <Html lang='en-US'>
                <Head></Head>
                <body>
                    <Main />
                    <NextScript />
                </body> 
            </Html>
        );
    }
}