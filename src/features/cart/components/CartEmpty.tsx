import { Button } from '#/components/shadcn/button';
import { Link } from '@tanstack/react-router';

export const CartEmpty = () => {
    return (
        <div className="container max-w-lg text-center h-full mt-16">
            <h1 className="mb-4 text-2xl font-semibold">Your cart is empty</h1>
            <p className="mb-8 text-muted-foreground">Looks like you haven't added anything yet.</p>
            <Button asChild>
                <Link to="/products">Continue Shopping</Link>
            </Button>
        </div>
    );
};
