import { getRouteApi } from '@tanstack/react-router';

const route = getRouteApi('/products/');

export const ProductsPage = () => {
    const { products } = route.useLoaderData();

    console.log(products);
    return (
        <div>
            <h1>produkter</h1>
        </div>
    );
};
