import React from 'react';
import Head from 'next/head';

const Shop = props => (
    <div>
        <h1>Hello from Checkout</h1>
    </div>
);

// Shop.getInitialProps = async () => {
//     const swapi = await fetch('https://swapi.dev/api/people/1').then(res => res.json());
//     return swapi;
// };

export default Shop;
