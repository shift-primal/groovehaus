import { Link } from '@tanstack/react-router';
import { SignedIn, SignedOut, UserButton } from '@neondatabase/auth/react';

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 px-8 py-4 backdrop-blur-lg flex items-cener text-xl justify-between bg-red-400">
            <Link to="/" className="self-center text-2xl">
                Groovehaus
            </Link>
            <div className="flex gap-x-8 items-center">
                <Link to="/products">Produkter</Link>
                <SignedIn>
                    <UserButton size="icon" />
                </SignedIn>
                <SignedOut>
                    <Link to="/auth/$pathname" params={{ pathname: 'sign-in' }}>
                        Logg inn
                    </Link>
                </SignedOut>
            </div>
        </header>
    );
};
