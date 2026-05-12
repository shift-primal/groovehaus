import { Cart } from '#/features/cart/components/Cart';
import { authClient } from '#/lib/auth';
import { RedirectToSignIn, SignedIn } from '@neondatabase/auth/react';
import { createFileRoute } from '@tanstack/react-router';

const CartPage = () => {
    const { data: userData } = authClient.useSession();

    return (
        <>
            <SignedIn>
                <Cart userId={userData?.user.id!} />
            </SignedIn>
            <RedirectToSignIn />
        </>
    );
};

export const Route = createFileRoute('/cart/')({
    component: CartPage
});
